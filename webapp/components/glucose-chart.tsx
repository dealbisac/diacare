"use client"

import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '@/lib/supabase-client';
import type { GlucoseReading } from '@/lib/supabase-client';

export function GlucoseChart() {
  const [readings, setReadings] = useState<GlucoseReading[]>([]);

  useEffect(() => {
    async function fetchReadings() {
      const { data, error } = await supabase
        .from('glucose_readings')
        .select('*')
        .order('taken_at', { ascending: true })
        .limit(100);

      if (error) {
        console.error('Error fetching readings:', error);
        return;
      }

      setReadings(data);
    }

    fetchReadings();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('glucose_readings')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'glucose_readings' },
        (payload) => {
          setReadings(current => [...current, payload.new as GlucoseReading]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={readings}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="taken_at"
            tickFormatter={(time) => new Date(time).toLocaleTimeString()}
            className="text-muted-foreground text-xs"
          />
          <YAxis className="text-muted-foreground text-xs" />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <Card className="p-2">
                    <p className="text-sm font-medium">
                      {new Date(payload[0].payload.taken_at).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {payload[0].value} mg/dL
                    </p>
                  </Card>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="reading_value"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}