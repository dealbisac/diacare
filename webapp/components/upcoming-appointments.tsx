"use client"

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import type { Appointment } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function UpcomingAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    async function fetchAppointments() {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .gte('appointment_date', new Date().toISOString())
        .order('appointment_date', { ascending: true })
        .limit(5);

      if (error) {
        console.error('Error fetching appointments:', error);
        return;
      }

      setAppointments(data);
    }

    fetchAppointments();
  }, []);

  return (
    <ScrollArea className="h-[200px]">
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="p-3 rounded-lg border space-y-2"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{appointment.title}</h4>
              <Button variant="ghost" size="sm">
                Reschedule
              </Button>
            </div>
            
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(appointment.appointment_date).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>
                  {new Date(appointment.appointment_date).toLocaleTimeString()}
                </span>
              </div>
              
              {appointment.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{appointment.location}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}