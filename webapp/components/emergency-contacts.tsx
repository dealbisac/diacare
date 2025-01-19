"use client"

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import type { EmergencyContact } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, Star, StarOff } from 'lucide-react';

export function EmergencyContacts() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchContacts() {
      const { data, error } = await supabase
        .from('emergency_contacts')
        .select('*')
        .order('is_primary', { ascending: false })
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching contacts:', error);
        return;
      }

      setContacts(data);
    }

    fetchContacts();
  }, []);

  const addContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const newContact = {
      contact_name: formData.get('name') as string,
      relationship: formData.get('relationship') as string,
      phone_number: formData.get('phone') as string,
      email: formData.get('email') as string,
      is_primary: contacts.length === 0, // First contact is primary
    };

    const { error } = await supabase
      .from('emergency_contacts')
      .insert([newContact]);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add emergency contact.",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Emergency contact added successfully.",
    });

    // Reset form
    (event.target as HTMLFormElement).reset();
  };

  const togglePrimary = async (contactId: string, currentIsPrimary: boolean) => {
    if (!currentIsPrimary) {
      // Remove primary status from current primary contact
      await supabase
        .from('emergency_contacts')
        .update({ is_primary: false })
        .eq('is_primary', true);

      // Set new primary contact
      const { error } = await supabase
        .from('emergency_contacts')
        .update({ is_primary: true })
        .eq('id', contactId);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update primary contact.",
        });
        return;
      }

      setContacts(current =>
        current.map(contact => ({
          ...contact,
          is_primary: contact.id === contactId,
        }))
      );

      toast({
        title: "Success",
        description: "Primary contact updated successfully.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={addContact} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="relationship">Relationship</Label>
            <Input id="relationship" name="relationship" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Add Contact
        </Button>
      </form>

      <div className="space-y-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center justify-between p-3 rounded-lg border"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{contact.contact_name}</h4>
                {contact.is_primary && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                    Primary
                  </span>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground">
                {contact.relationship}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {contact.phone_number}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </span>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => togglePrimary(contact.id, contact.is_primary)}
            >
              {contact.is_primary ? (
                <StarOff className="h-4 w-4" />
              ) : (
                <Star className="h-4 w-4" />
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}