import { Suspense } from 'react';
import { SiteHeader } from "@/components/site-header";
import { CommunityChat } from "@/components/community-chat";
import { Skeleton } from "@/components/ui/skeleton";
import ChatWithAI from '@/components/ai-chat';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AlertList from '@/components/alert-list';
import { AlertSettings } from '@/components/alert-settings';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Diacare Chat</h1>
          </div>
          <Tabs defaultValue="community">
                  <TabsList>
                    <TabsTrigger value="community">Community Chat</TabsTrigger>
                    <TabsTrigger value="ai">AI Chat</TabsTrigger>
                  </TabsList>
                  <TabsContent value="community">
                    <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
                       <CommunityChat />
                    </Suspense>
                  </TabsContent>
                  <TabsContent value="ai">
                    <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
                      <ChatWithAI />
                    </Suspense>
                  </TabsContent>
                </Tabs>
        </div>
      </main>
    </div>
  );
}