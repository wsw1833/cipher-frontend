'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Home,
  RotateCcw,
  MessageSquare,
  User,
  Clock,
  Target,
  Hash,
  Brain,
} from 'lucide-react';

export default function PostGameSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">CipherWolves</h1>
              <h1 className="text-2xl font-bold">Post-Game Analysis</h1>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                Keywords: 300
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                disabled
              >
                <RotateCcw className="h-4 w-4" />
                New Game
              </Button>
              <Button className="flex items-center gap-2" disabled>
                <Home className="h-4 w-4" />
                Return to Landing
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Sidebar - Full Conversation Log & Keywords */}
          <div className="lg:col-span-2 space-y-6">
            {/* Keywords Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5" />
                  Game Keywords
                </CardTitle>
                <CardDescription>
                  All 300 keywords from the game session
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80">
                  <div className="flex flex-wrap gap-1">
                    {/* Skeleton Keywords */}
                    {Array.from({ length: 50 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        className="h-6 rounded-full"
                        style={{ width: `${Math.random() * 60 + 40}px` }}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Full Conversation Log */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Full Game Log
                </CardTitle>
                <CardDescription>Complete conversation history</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-3">
                    {/* Skeleton Conversation Messages */}
                    {Array.from({ length: 15 }).map((_, index) => (
                      <div key={index} className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                        <Skeleton
                          className="h-12 rounded"
                          style={{ width: `${Math.random() * 40 + 60}%` }}
                        />
                        {index < 14 && <Separator className="my-2" />}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Character Analysis */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Character Analysis
                </h2>

                {/* Character Selection Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Card
                      key={index}
                      className="cursor-pointer transition-all hover:shadow-md"
                    >
                      <CardContent className="p-3">
                        <div className="flex flex-col items-center text-center gap-2">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>
                              <Skeleton className="h-12 w-12 rounded-full" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="w-full">
                            <Skeleton className="h-4 w-full mb-1" />
                            <Skeleton className="h-3 w-16 mx-auto" />
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <MessageSquare className="h-3 w-3" />
                            <Skeleton className="h-3 w-6" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Selected Character Details Skeleton */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        <Skeleton className="h-12 w-12 rounded-full" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Skeleton className="h-6 w-32 mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="personas" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="personas">
                        Personas & Analysis
                      </TabsTrigger>
                      <TabsTrigger value="conversations">
                        Conversations
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="analysis" className="space-y-4">
                      {/* Metrics Skeleton */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Array.from({ length: 3 }).map((_, index) => (
                          <div
                            key={index}
                            className="text-center p-3 bg-muted rounded-lg"
                          >
                            <Skeleton className="h-8 w-12 mx-auto mb-2" />
                            <Skeleton className="h-3 w-20 mx-auto" />
                          </div>
                        ))}
                      </div>

                      {/* Personality Traits Skeleton */}
                      <div>
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-4 w-full" />
                      </div>

                      {/* Key Insights Skeleton */}
                      <div>
                        <Skeleton className="h-5 w-24 mb-2" />
                        <div className="space-y-1">
                          {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <span className="text-primary">•</span>
                              <Skeleton className="h-4 flex-1" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Analysis Summary Skeleton */}
                      <div>
                        <Skeleton className="h-5 w-32 mb-2" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-4/5" />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="personas" className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Brain className="h-5 w-5" />
                        <Skeleton className="h-5 w-36" />
                      </div>
                      <div className="grid gap-3">
                        {Array.from({ length: 4 }).map((_, index) => (
                          <Card key={index} className="p-4">
                            <Skeleton className="h-4 w-full" />
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="conversations" className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <MessageSquare className="h-5 w-5" />
                        <Skeleton className="h-5 w-48" />
                      </div>
                      <ScrollArea className="h-[500px]">
                        <div className="space-y-3">
                          {Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className="flex flex-col gap-1">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <Skeleton className="h-3 w-16" />
                              </div>
                              <Skeleton
                                className="h-10 rounded"
                                style={{ width: `${Math.random() * 30 + 70}%` }}
                              />
                              {index < 7 && <Separator className="my-2" />}
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
