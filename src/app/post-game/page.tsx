'use client';

import { useEffect, useState } from 'react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Home,
  RotateCcw,
  MessageSquare,
  TrendingUp,
  User,
  Clock,
  Target,
  Hash,
  Brain,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SkeletonCard } from '@/components/skeletonLoading';
import {
  getAgentPersonas,
  getConversationHistory,
  getKeywords,
} from '@/actions/post-game-analysis';

interface Message {
  speaker: string;
  message: string;
  type?: 'voting_result' | 'vote' | 'analysis';
}

interface Conversation {
  round: number;
  phase: string;
  messages: Message[];
}

interface Persona {
  agent_name: string;
  instruction: string;
  description: string;
  is_werewolf: boolean;
}

interface GameData {
  conversation: Conversation[];
  personas: Persona[];
  keywords: Array<string>;
}

export default function PostGamePage() {
  const [selectedCharacter, setSelectedCharacter] = useState(0);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<GameData | null>(null);

  const getFilteredMessages = (messages: Message[]) => {
    return messages.filter(
      (msg) =>
        !msg.type || // No type (undefined)
        msg.type === 'voting_result' ||
        msg.type === 'vote' ||
        msg.type === 'analysis'
    );
  };

  const FilteredMessages = () => {
    if (!data?.conversation) return null;

    const Messages = data.conversation.flatMap((conv) =>
      getFilteredMessages(conv.messages).map((msg) => ({
        ...msg,
        round: conv.round,
        phase: conv.phase,
      }))
    );

    return (
      <div className="space-y-3">
        {Messages.map((entry, index) => (
          <div key={index} className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              Round {entry.round} : {entry.phase} - {entry.speaker}
            </div>
            <p className="text-sm bg-muted p-2 rounded">{entry.message}</p>
            {index < entry.message.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
      </div>
    );
  };

  const getPersonaRole = (persona: Persona): string => {
    const words = persona.instruction.split(' ');
    const fourthWord = words[3] || '';
    return fourthWord.replace(/[.,;:!?]$/, '');
  };

  const handleRedirect = (direct: string) => {
    if (direct === 'game') {
      router.push('/game');
    } else {
      router.push('/');
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        const gameID = localStorage.getItem('gameID');
        if (!gameID) {
          console.log('gameID not exist!');
          return;
        }

        // Wait for all API calls to complete
        const [conversation, personas, keywords] = await Promise.all([
          getConversationHistory(gameID),
          getAgentPersonas(gameID),
          getKeywords(gameID),
        ]);

        // Set all data at once
        setData({
          conversation,
          personas,
          keywords,
        });
      } catch (error) {
        console.log('error fetching data from APIs', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Loading...</h2>
        <SkeletonCard />
      </div>
    );
  }

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
                onClick={() => handleRedirect('game')}
              >
                <RotateCcw className="h-4 w-4" />
                New Game
              </Button>
              <Button
                className="flex items-center gap-2"
                onClick={() => handleRedirect('home')}
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
                    {data?.keywords.map((keyword, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
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
                  {FilteredMessages()}
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

                {/* Character Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
                  {data?.personas.map((persona, index) => (
                    <Card
                      key={persona.agent_name}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedCharacter === index ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedCharacter(index)}
                    >
                      <CardContent className="p-3">
                        <div className="flex flex-col items-center text-center gap-2">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={'/placeholder.svg'}
                              alt={persona.agent_name}
                            />
                            <AvatarFallback>
                              {persona.agent_name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">
                              {persona.agent_name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {getPersonaRole(persona)}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <MessageSquare className="h-3 w-3" />
                            {persona.is_werewolf}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Selected Character Details */}

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={'/placeholder.svg'}
                        alt={data?.personas[selectedCharacter]?.agent_name}
                      />
                      <AvatarFallback>
                        {data?.personas[selectedCharacter]?.agent_name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>
                        {data?.personas[selectedCharacter]?.agent_name}
                      </CardTitle>
                      <CardDescription>
                        {data?.personas[selectedCharacter] &&
                          getPersonaRole(data.personas[selectedCharacter])}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="personas" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="personas">
                        Personas & Analysis
                      </TabsTrigger>
                      <TabsTrigger value="conversations">
                        Conversations
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="personas" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {data?.personas[selectedCharacter] &&
                              getPersonaRole(data.personas[selectedCharacter])}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Persona & Traits
                          </div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-primary">
                            {data?.personas[selectedCharacter].is_werewolf
                              ? 'Yes'
                              : 'No'}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            WereWolf
                          </div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {/* final trust level */}
                            {/* {characters[selectedCharacter].trustLevel}% */}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Trust Level
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold flex mb-2">
                          Personality Traits
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {data?.personas[selectedCharacter].description}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">
                          Instruction Summary
                        </h4>
                        <p className="text-sm flex items-start mb-2">
                          {data?.personas[selectedCharacter].instruction}
                        </p>
                      </div>
                    </TabsContent>

                    {/* <TabsContent value="conversations" className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <MessageSquare className="h-5 w-5" />
                        <h4 className="font-semibold">
                          Individual Conversation Log
                        </h4>
                      </div>
                      <ScrollArea className="h-[500px]">
                        <div className="space-y-3">
                          {characters[
                            selectedCharacter
                          ].individualConversations.map((entry, index) => (
                            <div key={index} className="flex flex-col gap-1">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {entry.time} - {entry.speaker}
                              </div>
                              <p className="text-sm bg-muted p-2 rounded">
                                {entry.message}
                              </p>
                              {index <
                                characters[selectedCharacter]
                                  .individualConversations.length -
                                  1 && <Separator className="my-2" />}
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent> */}
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
