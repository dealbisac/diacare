// database.types
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          full_name: string
          id: string
          user_id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          birthdate: string
          avatar_url: string
          created_at: string
          updated_at: string
        }
      }
      glucose_readings: {
        Row: {
          notes: string
          taken_at: string | number | Date
          reading_value: string
          id: string
          user_id: string
          reading: number
          reading_date: string
          reading_time: string
          created_at: string
          updated_at: string
        }
      }
      medical_devices: {
        Row: {
          last_sync_at: any
          id: string
          user_id: string
          device_name: string
          device_type: string
          device_serial: string
          created_at: string
          updated_at: string
        }
      }
      alerts: {
        Row: {
          threshold_low: string
          threshold_high: string
          is_active: any
          id: string
          user_id: string
          alert_type: string
          alert_message: string
          created_at: string
          updated_at: string
        }
      }
      emergency_contacts: {
        Row: {
          phone_number: string
          is_primary: any
          contact_name: string
          id: string
          user_id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          relationship: string
          created_at: string
          updated_at: string
        }
      }
      appointments: {
        Row: {
          title: string
          location: any
          id: string
          user_id: string
          appointment_date: string
          appointment_time: string
          appointment_with: string
          appointment_location: string
          created_at: string
          updated_at: string
        }
      }
      shared_access: {
        Row: {
          id: string
          user_id: string
          shared_with: string
          shared_until: string
          created_at: string
          updated_at: string
        }
      }
    }
  }
}
// database.types
