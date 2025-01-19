"use client"

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import type { SharedAccess, Profile } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function FamilySharing() {
  const [sharedAccess, setSharedAccess] = useState<(SharedAccess & { granted_to: Profile })[]>([]);
  const [email, setEmail] = useState('');
  const [accessLevel, setAccessLevel] = useState('read');
  const { toast } = useToast();

  useEffect(() => {
    async function fetchSharedAccess() {
      const { data, error } = await supabase
        .from('shared_access')
        .select(`
          *,
          granted_to:profiles!granted_to_user_id(
            email,
            full_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching shared access:', error);
        return;
      }

      setSharedAccess(data);
    }

    fetchSharedAccess();
  }, []);

  const addSharedAccess = async () => {
    // First, find the user by email
    const { data: users, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();

    if (userError || !users) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "User not found with this email.",
      });
      return;
    }

    // Add shared access
    const { error } = await supabase
      .from('shared_access')
      .insert({
        granted_to_user_id: users.id,
        access_level: accessLevel,
      });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to share access.",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Access shared successfully.",
    });

    setEmail('');
    setAccessLevel('read');
  };

  const removeAccess = async (id: string) => {
    const { error } = await supabase
      .from('shared_access')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove access.",
      });
      return;
    }

    setSharedAccess(current =>
      current.filter(access => access.id !== id)
    );

    toast({
      title: "Success",
      description: "Access removed successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Share with (email)</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="family.member@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label>Access Level</Label>
          <Select value={accessLevel} onValueChange={setAccessLevel}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="read">View Only</SelectItem>
              <SelectItem value="manage">Manage</SelectItem>
              <SelectItem value="full">Full Access</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={addSharedAccess} className="w-full">
          Share Access
        </Button>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Shared With</h4>
        {sharedAccess.map((access) => (
          <div
            key={access.id}
            className="flex items-center justify-between p-3 rounded-lg border"
          >
            <div>
              <p className="font-medium">
                {access.granted_to.full_name || access.granted_to.email}
              </p>
              <p className="text-sm text-muted-foreground">
                {access.access_level} access
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeAccess(access.id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}