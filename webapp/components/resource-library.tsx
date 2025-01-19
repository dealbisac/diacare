"use client"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, Link as LinkIcon } from 'lucide-react';

const resources = {
  articles: [
    {
      id: 1,
      title: "Understanding Type 2 Diabetes",
      description: "A comprehensive guide to managing Type 2 Diabetes",
      category: "Education",
      readTime: "10 min read",
      source: "American Diabetes Association",
      link: "#",
    },
    {
      id: 2,
      title: "Nutrition Guidelines for Diabetics",
      description: "Latest dietary recommendations for blood sugar management",
      category: "Nutrition",
      readTime: "15 min read",
      source: "Mayo Clinic",
      link: "#",
    },
    {
      id: 3,
      title: "Exercise and Blood Sugar Control",
      description: "How physical activity affects glucose levels",
      category: "Lifestyle",
      readTime: "8 min read",
      source: "WebMD",
      link: "#",
    },
  ],
  videos: [
    {
      id: 1,
      title: "Daily Diabetes Management",
      description: "Expert tips for managing diabetes day-to-day",
      duration: "15:30",
      source: "DiabetesEducation.net",
      link: "#",
    },
    {
      id: 2,
      title: "Cooking for Diabetes",
      description: "Healthy recipe demonstrations",
      duration: "22:45",
      source: "HealthyEating.org",
      link: "#",
    },
  ],
  research: [
    {
      id: 1,
      title: "Latest Developments in Diabetes Treatment",
      description: "Recent research findings and treatment advances",
      journal: "Diabetes Care",
      date: "2024",
      link: "#",
    },
    {
      id: 2,
      title: "Long-term Effects of Diabetes Management",
      description: "Study on the effectiveness of various management strategies",
      journal: "The Lancet",
      date: "2023",
      link: "#",
    },
  ],
};

export function ResourceLibrary() {
  const [activeTab, setActiveTab] = useState("articles");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Library</CardTitle>
        <CardDescription>
          Curated resources to help you manage diabetes effectively
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="articles">
              <BookOpen className="h-4 w-4 mr-2" />
              Articles
            </TabsTrigger>
            <TabsTrigger value="videos">
              <Video className="h-4 w-4 mr-2" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="research">
              <FileText className="h-4 w-4 mr-2" />
              Research
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles">
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {resources.articles.map((article) => (
                  <Card key={article.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{article.title}</CardTitle>
                        <Button variant="ghost" size="sm">
                          <LinkIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardDescription>{article.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{article.category}</span>
                        <span>{article.readTime}</span>
                        <span>{article.source}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="videos">
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {resources.videos.map((video) => (
                  <Card key={video.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{video.title}</CardTitle>
                        <Button variant="ghost" size="sm">
                          <Video className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardDescription>{video.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{video.duration}</span>
                        <span>{video.source}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="research">
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {resources.research.map((paper) => (
                  <Card key={paper.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{paper.title}</CardTitle>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardDescription>{paper.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{paper.journal}</span>
                        <span>{paper.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}