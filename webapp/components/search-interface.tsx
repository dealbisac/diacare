"use client"

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, BookOpen, Video, FileText, Tag } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'research';
  tags: string[];
  source: string;
  date: string;
}

export function SearchInterface() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Simulated search function
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    // Simulated API call delay
    setTimeout(() => {
      const searchResults: SearchResult[] = [
        {
          id: '1',
          title: "Managing Blood Sugar Levels",
          description: "Comprehensive guide to blood glucose management",
          type: 'article',
          tags: ['blood sugar', 'management', 'guide'],
          source: "Diabetes Association",
          date: "2024-01-15",
        },
        {
          id: '2',
          title: "Exercise and Diabetes",
          description: "How physical activity affects diabetes management",
          type: 'video',
          tags: ['exercise', 'lifestyle', 'health'],
          source: "Health & Wellness Channel",
          date: "2024-01-10",
        },
        {
          id: '3',
          title: "Latest Treatment Methods",
          description: "Recent developments in diabetes treatment",
          type: 'research',
          tags: ['treatment', 'research', 'medical'],
          source: "Medical Journal",
          date: "2024-01-05",
        },
      ];

      setResults(searchResults);
      setIsSearching(false);
    }, 500);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <BookOpen className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'research':
        return <FileText className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Search Resources</CardTitle>
          <CardDescription>
            Search through articles, videos, and research papers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for diabetes resources..."
              className="flex-1"
            />
            <Button type="submit" disabled={isSearching}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              Found {results.length} results for "{query}"
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {results.map((result) => (
                  <Card key={result.id}>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        {getIcon(result.type)}
                        <CardTitle className="text-lg">
                          {result.title}
                        </CardTitle>
                      </div>
                      <CardDescription>{result.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {result.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{result.source}</span>
                          <span>{new Date(result.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}