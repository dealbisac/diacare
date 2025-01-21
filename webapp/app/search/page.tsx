import { SiteHeader } from "@/components/site-header";
import { SearchInterface } from "@/components/search-interface";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Search Resources</h1>
          </div>
          <SearchInterface />
        </div>
      </main>
    </div>
  );
}