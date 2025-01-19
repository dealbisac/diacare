import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type GlucoseReading = Database['public']['Tables']['glucose_readings']['Row'];
export type MedicalDevice = Database['public']['Tables']['medical_devices']['Row'];
export type Alert = Database['public']['Tables']['alerts']['Row'];
export type EmergencyContact = Database['public']['Tables']['emergency_contacts']['Row'];
export type Appointment = Database['public']['Tables']['appointments']['Row'];
export type SharedAccess = Database['public']['Tables']['shared_access']['Row'];