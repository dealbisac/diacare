"use client";

import React, { useState } from 'react';
import { chatSession } from '@/config/GeminiAi';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

function ChatWithAI() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();

  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  }

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const result = await chatSession.sendMessage(input);
      const aiResponse = JSON.parse(result?.response?.text()?.replace(/,(\s*[}\]])/g, "$1"));
      setResponse(aiResponse);
      toast({
        title: "Success",
        description: "Message sent successfully!",
      });
    } catch (error) {
      console.error("Error in AI chat:", error);
      toast({
        title: "Error",
        description: "Error sending message. Please try again.!",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='p-10'>
      <h2 className='font-extrabold text-4xl text-center'>Chat with AI</h2>
      <textarea
        className='w-full p-4 mt-4 border rounded-md'
        value={input}
        onChange={handleInputChange}
        placeholder="Type your message here..."
      ></textarea>
      <div className='flex justify-end mt-4'>
        <Button 
          color='primary' 
          className='p-4' 
          disabled={loading || !input}
          onClick={handleSubmit}
        >
          {loading ? "Sending..." : "Send"}
        </Button>
      </div>

      {response && (
        <div className='mt-6'>
          <h3 className='font-bold text-2xl'>AI Response:</h3>
          <p className='mt-2'>{JSON.stringify(response)}</p>
        </div>
      )}
    </div>
  );
}

export default ChatWithAI;
