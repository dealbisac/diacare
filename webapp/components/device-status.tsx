"use client"

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import type { MedicalDevice } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { PlusCircle, Smartphone, Watch, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function DeviceStatus() {
  const [devices, setDevices] = useState<MedicalDevice[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchDevices() {
      const { data, error } = await supabase
        .from('medical_devices')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching devices:', error);
        return;
      }

      setDevices(data);
    }

    fetchDevices();
  }, []);

  const getDeviceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'cgm':
        return <Activity className="h-5 w-5" />;
      case 'smartwatch':
        return <Watch className="h-5 w-5" />;
      default:
        return <Smartphone className="h-5 w-5" />;
    }
  };

  const syncDevice = async (deviceId: string) => {
    // In a real app, this would integrate with device APIs
    toast({
      title: "Syncing device...",
      description: "Please wait while we sync your device data.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Device
        </Button>
      </div>
      
      <div className="space-y-2">
        {devices.map((device) => (
          <div
            key={device.id}
            className="flex items-center justify-between p-3 rounded-lg border"
          >
            <div className="flex items-center gap-3">
              {getDeviceIcon(device.device_type)}
              <div>
                <p className="font-medium">{device.device_name}</p>
                <p className="text-sm text-muted-foreground">
                  Last synced: {device.last_sync_at ? 
                    new Date(device.last_sync_at).toLocaleString() : 
                    'Never'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => syncDevice(device.id)}
            >
              Sync
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}