"use client"

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import type { Alert } from '@/lib/supabase-client';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function AlertSettings() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchAlerts() {
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching alerts:', error);
        return;
      }

      setAlerts(data);
    }

    fetchAlerts();
  }, []);

  const updateAlert = async (alertId: string, updates: Partial<Alert>) => {
    const { error } = await supabase
      .from('alerts')
      .update(updates)
      .eq('id', alertId);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update alert settings.",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Alert settings updated successfully.",
    });

    setAlerts(current =>
      current.map(alert =>
        alert.id === alertId ? { ...alert, ...updates } : alert
      )
    );
  };

  return (
    <div className="space-y-6">
      {alerts.map((alert) => (
        <div key={alert.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor={`alert-${alert.id}`} className="font-medium">
              {alert.alert_type}
            </Label>
            <Switch
              id={`alert-${alert.id}`}
              checked={alert.is_active}
              onCheckedChange={(checked: any) =>
                updateAlert(alert.id, { is_active: checked })
              }
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Low Threshold</Label>
              <Input
                type="number"
                value={alert.threshold_low || ''}
                onChange={(e) =>
                  updateAlert(alert.id, {
                    threshold_low: parseFloat(e.target.value),
                  })
                }
                placeholder="mg/dL"
              />
            </div>
            
            <div className="space-y-2">
              <Label>High Threshold</Label>
              <Input
                type="number"
                value={alert.threshold_high || ''}
                onChange={(e) =>
                  updateAlert(alert.id, {
                    threshold_high: parseFloat(e.target.value),
                  })
                }
                placeholder="mg/dL"
              />
            </div>
          </div>
        </div>
      ))}
      
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          toast({
            title: "Test Alert",
            description: "You have pressed the alert button, Click X to cancel the alert.",
          });
        }}
      >
        Test Notifications
      </Button>
    </div>
  );
}