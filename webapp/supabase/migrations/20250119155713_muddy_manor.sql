/*
  # Initial Database Schema for Diabetes Management System

  1. New Tables
    - `profiles`
      - User profiles with basic information and preferences
    - `glucose_readings`
      - Blood glucose measurements with timestamps and metadata
    - `medical_devices`
      - Connected medical devices information
    - `alerts`
      - User-specific alert configurations
    - `emergency_contacts`
      - Emergency contact information for users
    - `appointments`
      - Medical appointments and reminders
    - `shared_access`
      - Family sharing and access control

  2. Security
    - Enable RLS on all tables
    - Add policies for data access and sharing
    - Implement row-level security for family sharing

  3. Changes
    - Initial schema creation
    - Setup for real-time functionality
    - Family sharing infrastructure
*/

-- Profiles table for user information
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  diabetes_type text,
  target_range_min integer,
  target_range_max integer,
  time_zone text,
  measurement_unit text DEFAULT 'mg/dL',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Glucose readings table
CREATE TABLE IF NOT EXISTS glucose_readings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  reading_value decimal NOT NULL,
  reading_unit text DEFAULT 'mg/dL',
  reading_type text, -- manual, cgm, etc.
  device_id uuid,
  notes text,
  taken_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Medical devices table
CREATE TABLE IF NOT EXISTS medical_devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  device_name text NOT NULL,
  device_type text NOT NULL,
  device_identifier text,
  last_sync_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Alerts configuration
CREATE TABLE IF NOT EXISTS alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  alert_type text NOT NULL,
  threshold_low decimal,
  threshold_high decimal,
  is_active boolean DEFAULT true,
  notification_method text[] DEFAULT ARRAY['email'],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Emergency contacts
CREATE TABLE IF NOT EXISTS emergency_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  contact_name text NOT NULL,
  relationship text,
  phone_number text,
  email text,
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Appointments
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  appointment_date timestamptz NOT NULL,
  reminder_before interval DEFAULT '24 hours',
  location text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Shared access for family members
CREATE TABLE IF NOT EXISTS shared_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  granted_to_user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  access_level text NOT NULL,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  UNIQUE(user_id, granted_to_user_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE glucose_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_access ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Policies for glucose readings
CREATE POLICY "Users can view own readings and shared readings"
  ON glucose_readings FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM shared_access
      WHERE shared_access.user_id = glucose_readings.user_id
      AND shared_access.granted_to_user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own readings"
  ON glucose_readings FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Policies for medical devices
CREATE POLICY "Users can manage own devices"
  ON medical_devices FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Policies for alerts
CREATE POLICY "Users can manage own alerts"
  ON alerts FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Policies for emergency contacts
CREATE POLICY "Users can manage own emergency contacts"
  ON emergency_contacts FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Policies for appointments
CREATE POLICY "Users can manage own appointments"
  ON appointments FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Policies for shared access
CREATE POLICY "Users can manage own sharing settings"
  ON shared_access FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Functions for real-time features
CREATE OR REPLACE FUNCTION check_glucose_alert()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if reading is outside target range
  IF EXISTS (
    SELECT 1 FROM alerts a
    WHERE a.user_id = NEW.user_id
    AND a.is_active = true
    AND (
      NEW.reading_value <= a.threshold_low
      OR NEW.reading_value >= a.threshold_high
    )
  ) THEN
    -- In a real implementation, this would trigger a notification
    -- For now, we'll just add a note to the reading
    NEW.notes = COALESCE(NEW.notes, '') || ' [ALERT: Outside target range]';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for glucose alerts
CREATE TRIGGER trigger_glucose_alert
  BEFORE INSERT ON glucose_readings
  FOR EACH ROW
  EXECUTE FUNCTION check_glucose_alert();