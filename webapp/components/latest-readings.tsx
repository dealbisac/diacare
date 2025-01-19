"use client"

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import type { GlucoseReading } from '@/lib/supabase-client';
import { ScrollArea } from '@/components/ui/scroll-area';

export function LatestReadings() {
  const [readings, setReadings] = useState<GlucoseReading[]>([]);

  useEffect(() => {
    async function fetchLatestReadings() {
      const { data, error } = await supabase
        .from('glucose_readings')
        .select('*')
        .order('taken_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching readings:', error);
        return;
      }

      setReadings(data);
    }

    fetchLatestReadings();

    const channel = supabase
      .channel('latest_readings')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'glucose_readings' },
        (payload) => {
          setReadings(current => [payload.new as GlucoseReading, ...current.slice(0, 9)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <ScrollArea className="h-[200px]">
      <div className="space-y-4">
        {readings.map((reading) => (
          <div
            key={reading.id}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted"
          >
            <div>
              <p className="font-medium">{reading.reading_value} mg/dL</p>
              <p className="text-sm text-muted-foreground">
                {new Date(reading.taken_at).toLocaleString()}
              </p>
            </div>
            {reading.notes && (
              <p className="text-sm text-muted-foreground">{reading.notes}</p>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}