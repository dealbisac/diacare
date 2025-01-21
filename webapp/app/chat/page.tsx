import { Suspense } from 'react';
import { SiteHeader } from "@/components/site-header";
import { CommunityChat } from "@/components/community-chat";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">AI Chat</h1>
          </div>
          <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
            <CommunityChat />
          </Suspense>
        </div>
      </main>
    </div>
  );
}