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
} from 'lucide-react';
import Image from 'next/image';
import beerMug from '@images/beer-mug.svg';

export default function PostGameSkeleton() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#15130A' }}>
      {/* Header */}
      <header
        className="shadow-lg shadow-[#FF990050]"
        style={{ backgroundColor: '#1a1810' }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-white">
              <Image src={beerMug} alt="logo" className="w-8 h-8" />

              <h1 className="text-2xl font-bold">CipherWolves</h1>
              <h1 className="text-xl font-bold">Post-Game Analysis</h1>
              <Badge className="flex items-center gap-1 bg-[#ffb300] text-black">
                <Target className="h-3 w-3" />
                Keywords: 300
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-white/20 text-white"
                disabled
              >
                <RotateCcw className="h-4 w-4" />
                New Game
              </Button>
              <Button
                className="flex items-center gap-2 text-black"
                style={{ backgroundColor: '#ffb300' }}
                disabled
              >
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
            <Card
              className="shadow-[0_2px_8px_rgb(0,0,0,0.2)] shadow-[#FF990050] border-0 bg-[#1a1810] text-white"
              style={{ backgroundColor: '#1a1810' }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Hash className="h-5 w-5" />
                  Game Keywords
                </CardTitle>
                <CardDescription className="text-white/70">
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
                        className="h-6 rounded-full bg-white/20"
                        style={{ width: `${Math.random() * 60 + 40}px` }}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Full Conversation Log */}
            <Card
              className="shadow-[0_2px_8px_rgb(0,0,0,0.2)] shadow-[#FF990050] border-0 bg-[#1a1810] text-white"
              style={{ backgroundColor: '#1a1810' }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MessageSquare className="h-5 w-5" />
                  Full Game Log
                </CardTitle>
                <CardDescription className="text-white/70">
                  Complete conversation history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-3">
                    {/* Skeleton Conversation Messages */}
                    {Array.from({ length: 15 }).map((_, index) => (
                      <div key={index} className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-xs text-white/60">
                          <Clock className="h-3 w-3" />
                          <Skeleton className="h-3 w-20 bg-white/20" />
                        </div>
                        <Skeleton
                          className="h-12 rounded bg-white/20"
                          style={{ width: `${Math.random() * 40 + 60}%` }}
                        />
                        {index < 14 && (
                          <Separator className="my-2 bg-white/20" />
                        )}
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
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
                  <User className="h-5 w-5" />
                  Character Analysis
                </h2>

                {/* Character Selection Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Card
                      key={index}
                      className="cursor-pointer transition-all hover:shadow-md border-white/20"
                      style={{ backgroundColor: '#1a1810' }}
                    >
                      <CardContent className="p-3">
                        <div className="flex flex-col items-center text-center gap-2">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-white/10">
                              <Skeleton className="h-12 w-12 rounded-full bg-white/20" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="w-full">
                            <Skeleton className="h-4 w-full mb-1 bg-white/20" />
                            <Skeleton className="h-3 w-16 mx-auto bg-white/20" />
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <MessageSquare className="h-3 w-3 text-white/60" />
                            <Skeleton className="h-3 w-6 bg-white/20" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Selected Character Details Skeleton */}
              <Card
                className="shadow-[0_2px_8px_rgb(0,0,0,0.2)] shadow-[#FF990050] border-0 bg-[#1a1810] text-white"
                style={{ backgroundColor: '#1a1810' }}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-white/10">
                        <Skeleton className="h-12 w-12 rounded-full bg-white/20" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Skeleton className="h-6 w-32 mb-2 bg-white/20" />
                      <Skeleton className="h-4 w-24 bg-white/20" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="personas" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-white/10">
                      <TabsTrigger
                        value="personas"
                        className="text-white data-[state=active]:bg-[#ffb300] data-[state=active]:text-black"
                      >
                        Personas & Analysis
                      </TabsTrigger>
                      <TabsTrigger
                        value="conversations"
                        className="text-white data-[state=active]:bg-[#ffb300] data-[state=active]:text-black"
                      >
                        Conversations
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="personas" className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Skeleton className="h-5 w-36 bg-white/20" />
                      </div>
                      <div className="grid gap-3">
                        {Array.from({ length: 4 }).map((_, index) => (
                          <Card
                            key={index}
                            className="p-4 border-white/20"
                            style={{ backgroundColor: '#2a2520' }}
                          >
                            <Skeleton className="h-4 w-full bg-white/20" />
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="conversations" className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <MessageSquare className="h-5 w-5 text-white" />
                        <Skeleton className="h-5 w-48 bg-white/20" />
                      </div>
                      <ScrollArea className="h-[500px]">
                        <div className="space-y-3">
                          {Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className="flex flex-col gap-1">
                              <div className="flex items-center gap-2 text-xs text-white/60">
                                <Clock className="h-3 w-3" />
                                <Skeleton className="h-3 w-16 bg-white/20" />
                              </div>
                              <Skeleton
                                className="h-10 rounded bg-white/20"
                                style={{ width: `${Math.random() * 30 + 70}%` }}
                              />
                              {index < 7 && (
                                <Separator className="my-2 bg-white/20" />
                              )}
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
