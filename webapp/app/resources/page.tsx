import { SiteHeader } from "@/components/site-header";
import { ResourceLibrary } from "@/components/resource-library";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Latest Resources</h1>
          </div>
          <ResourceLibrary />
        </div>
      </main>
    </div>
  );
}