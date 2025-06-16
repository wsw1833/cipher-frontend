'use client';

import { useState } from 'react';
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

export default function PostGamePage() {
  const [selectedCharacter, setSelectedCharacter] = useState(0);
  const router = useRouter();

  const gameKeywords = [
    'mystery',
    'investigation',
    'evidence',
    'alibi',
    'suspect',
    'motive',
    'witness',
    'clue',
    'deduction',
    'logic',
    'trust',
    'betrayal',
    'secret',
    'revelation',
    'truth',
    'lie',
    'confession',
    'denial',
    'accusation',
    'defense',
    'strategy',
    'planning',
    'decision',
    'choice',
    'consequence',
    'outcome',
    'risk',
    'reward',
    'opportunity',
    'threat',
    'emotion',
    'fear',
    'anger',
    'sadness',
    'joy',
    'surprise',
    'disgust',
    'anticipation',
    'empathy',
    'compassion',
    'relationship',
    'friendship',
    'rivalry',
    'alliance',
    'partnership',
    'conflict',
    'cooperation',
    'competition',
    'support',
    'opposition',
    'communication',
    'dialogue',
    'conversation',
    'discussion',
    'argument',
    'negotiation',
    'persuasion',
    'influence',
    'manipulation',
    'honesty',
    'character',
    'personality',
    'trait',
    'behavior',
    'action',
    'reaction',
    'response',
    'initiative',
    'leadership',
    'followership',
    'knowledge',
    'information',
    'data',
    'fact',
    'opinion',
    'belief',
    'assumption',
    'hypothesis',
    'theory',
    'conclusion',
    'time',
    'pressure',
    'deadline',
    'urgency',
    'patience',
    'timing',
    'sequence',
    'order',
    'priority',
    'schedule',
    'place',
    'location',
    'setting',
    'environment',
    'atmosphere',
    'context',
    'situation',
    'circumstance',
    'condition',
    'state',
    'object',
    'item',
    'tool',
    'weapon',
    'resource',
    'asset',
    'possession',
    'property',
    'material',
    'substance',
    'person',
    'individual',
    'character',
    'role',
    'position',
    'status',
    'rank',
    'authority',
    'power',
    'influence',
    'group',
    'team',
    'organization',
    'institution',
    'society',
    'community',
    'network',
    'connection',
    'link',
    'bond',
    'goal',
    'objective',
    'purpose',
    'intention',
    'aim',
    'target',
    'mission',
    'vision',
    'dream',
    'aspiration',
    'problem',
    'issue',
    'challenge',
    'obstacle',
    'barrier',
    'difficulty',
    'complication',
    'dilemma',
    'crisis',
    'emergency',
    'solution',
    'answer',
    'resolution',
    'fix',
    'remedy',
    'cure',
    'treatment',
    'approach',
    'method',
    'technique',
    'success',
    'failure',
    'victory',
    'defeat',
    'win',
    'loss',
    'achievement',
    'accomplishment',
    'progress',
    'setback',
    'change',
    'transformation',
    'evolution',
    'development',
    'growth',
    'improvement',
    'decline',
    'deterioration',
    'stability',
    'consistency',
    'past',
    'present',
    'future',
    'history',
    'tradition',
    'heritage',
    'legacy',
    'memory',
    'experience',
    'lesson',
    'possibility',
    'probability',
    'certainty',
    'uncertainty',
    'doubt',
    'confidence',
    'hope',
    'despair',
    'optimism',
    'pessimism',
    'value',
    'principle',
    'ethic',
    'moral',
    'standard',
    'norm',
    'rule',
    'law',
    'regulation',
    'guideline',
    'freedom',
    'constraint',
    'limitation',
    'boundary',
    'restriction',
    'permission',
    'prohibition',
    'allowance',
    'tolerance',
    'acceptance',
    'identity',
    'self',
    'ego',
    'consciousness',
    'awareness',
    'perception',
    'understanding',
    'comprehension',
    'insight',
    'wisdom',
    'creativity',
    'innovation',
    'invention',
    'discovery',
    'exploration',
    'investigation',
    'research',
    'study',
    'analysis',
    'synthesis',
    'art',
    'science',
    'technology',
    'culture',
    'tradition',
    'custom',
    'practice',
    'habit',
    'routine',
    'pattern',
    'nature',
    'natural',
    'artificial',
    'synthetic',
    'organic',
    'mechanical',
    'digital',
    'virtual',
    'real',
    'actual',
    'beauty',
    'ugliness',
    'attraction',
    'repulsion',
    'appeal',
    'charm',
    'grace',
    'elegance',
    'style',
    'fashion',
    'health',
    'illness',
    'wellness',
    'fitness',
    'strength',
    'weakness',
    'energy',
    'fatigue',
    'vitality',
    'mortality',
    'wealth',
    'poverty',
    'richness',
    'abundance',
    'scarcity',
    'luxury',
    'necessity',
    'want',
    'need',
    'desire',
    'education',
    'learning',
    'teaching',
    'instruction',
    'training',
    'practice',
    'skill',
    'talent',
    'ability',
    'capacity',
    'work',
    'labor',
    'effort',
    'struggle',
    'challenge',
    'task',
    'job',
    'career',
    'profession',
    'occupation',
  ];

  const characters = [
    {
      id: 1,
      name: 'Elena Rodriguez',
      role: 'Detective',
      avatar: '/placeholder.svg?height=40&width=40',
      personality: 'Analytical, methodical, suspicious',
      personas: [
        'The Investigator: Systematic approach to problem-solving',
        'The Skeptic: Questions everything and everyone',
        'The Professional: Maintains objectivity under pressure',
        'The Protector: Driven by justice and truth',
      ],
      keyInsights: [
        'Focused on logical deduction',
        'Asked probing questions about alibis',
        'Showed skepticism towards emotional appeals',
      ],
      conversationCount: 23,
      trustLevel: 85,
      analysis:
        'Elena demonstrated strong analytical thinking throughout the game. Her detective background showed in her systematic approach to questioning and evidence gathering.',
      individualConversations: [
        {
          time: '14:15',
          speaker: 'You',
          message: "Elena, what's your take on the evidence we've gathered?",
        },
        {
          time: '14:16',
          speaker: 'Elena',
          message:
            "The timeline doesn't add up. Someone's lying about their whereabouts.",
        },
        {
          time: '14:17',
          speaker: 'You',
          message: 'Who do you suspect the most?',
        },
        {
          time: '14:18',
          speaker: 'Elena',
          message: 'I never reveal my suspicions until I have concrete proof.',
        },
        {
          time: '14:45',
          speaker: 'You',
          message: 'The fingerprints on the glass - what do you make of them?',
        },
        {
          time: '14:46',
          speaker: 'Elena',
          message:
            "Interesting. They're smudged, almost deliberately obscured.",
        },
        {
          time: '15:02',
          speaker: 'Elena',
          message:
            "I've been thinking about the victim's last known movements.",
        },
        {
          time: '15:03',
          speaker: 'You',
          message: 'And what conclusion did you reach?',
        },
      ],
    },
    {
      id: 2,
      name: 'Marcus Chen',
      role: 'Businessman',
      avatar: '/placeholder.svg?height=40&width=40',
      personality: 'Pragmatic, ambitious, calculating',
      personas: [
        'The Strategist: Always thinking three steps ahead',
        'The Negotiator: Seeks win-win solutions',
        'The Opportunist: Spots potential in every situation',
        'The Realist: Focuses on practical outcomes',
      ],
      keyInsights: [
        'Prioritized profit-driven solutions',
        'Showed strategic thinking',
        'Avoided emotional discussions',
      ],
      conversationCount: 18,
      trustLevel: 62,
      analysis:
        'Marcus approached conversations with a business mindset, often looking for win-win scenarios and practical outcomes.',
      individualConversations: [
        {
          time: '14:20',
          speaker: 'Marcus',
          message:
            'Time is money. We need to focus on actionable intelligence.',
        },
        {
          time: '14:21',
          speaker: 'You',
          message: "But shouldn't we consider all angles?",
        },
        {
          time: '14:22',
          speaker: 'Marcus',
          message: 'Analysis paralysis kills more deals than bad decisions.',
        },
        {
          time: '14:50',
          speaker: 'You',
          message: "What's your business perspective on this situation?",
        },
        {
          time: '14:51',
          speaker: 'Marcus',
          message: 'Someone had a clear motive - follow the money trail.',
        },
        {
          time: '15:10',
          speaker: 'Marcus',
          message: "I've seen similar patterns in corporate espionage cases.",
        },
        { time: '15:11', speaker: 'You', message: 'How so?' },
        {
          time: '15:12',
          speaker: 'Marcus',
          message: "The setup, the timing - it's all too convenient.",
        },
      ],
    },
    {
      id: 3,
      name: 'Sarah Williams',
      role: 'Teacher',
      avatar: '/placeholder.svg?height=40&width=40',
      personality: 'Empathetic, patient, nurturing',
      personas: [
        'The Mentor: Guides others toward understanding',
        'The Mediator: Seeks harmony and resolution',
        "The Nurturer: Cares for everyone's wellbeing",
        "The Optimist: Believes in people's potential for good",
      ],
      keyInsights: [
        'Emphasized understanding and growth',
        'Asked about motivations and feelings',
        'Offered supportive responses',
      ],
      conversationCount: 31,
      trustLevel: 94,
      analysis:
        "Sarah's teaching background was evident in her patient, understanding approach and her focus on personal development.",
      individualConversations: [
        {
          time: '14:25',
          speaker: 'Sarah',
          message: 'I think we need to understand why someone would do this.',
        },
        {
          time: '14:26',
          speaker: 'You',
          message: 'You always look for the human side of things.',
        },
        {
          time: '14:27',
          speaker: 'Sarah',
          message:
            'Everyone has a story. Understanding it helps us find solutions.',
        },
        {
          time: '14:55',
          speaker: 'You',
          message: 'How do you think the group is handling the pressure?',
        },
        {
          time: '14:56',
          speaker: 'Sarah',
          message:
            'Some are struggling more than others. We should support each other.',
        },
        {
          time: '15:15',
          speaker: 'Sarah',
          message: 'I noticed Jake seems particularly affected by all this.',
        },
        { time: '15:16', speaker: 'You', message: 'Should we be concerned?' },
        {
          time: '15:17',
          speaker: 'Sarah',
          message: 'Not concerned, but aware. He processes things differently.',
        },
      ],
    },
    {
      id: 4,
      name: 'Jake Thompson',
      role: 'Artist',
      avatar: '/placeholder.svg?height=40&width=40',
      personality: 'Creative, intuitive, expressive',
      personas: [
        'The Visionary: Sees possibilities others miss',
        'The Free Spirit: Thinks outside conventional boundaries',
        'The Empath: Feels deeply and expresses freely',
        'The Innovator: Approaches problems creatively',
      ],
      keyInsights: [
        'Focused on creative solutions',
        'Expressed emotions freely',
        'Thought outside conventional boundaries',
      ],
      conversationCount: 27,
      trustLevel: 78,
      analysis:
        'Jake brought a unique creative perspective, often suggesting unconventional approaches and expressing himself through metaphors.',
      individualConversations: [
        {
          time: '14:30',
          speaker: 'Jake',
          message:
            'This whole situation feels like a dark painting - lots of shadows hiding the truth.',
        },
        {
          time: '14:31',
          speaker: 'You',
          message: "That's an interesting way to put it.",
        },
        {
          time: '14:32',
          speaker: 'Jake',
          message: 'Art teaches you to look beyond the surface, you know?',
        },
        {
          time: '15:00',
          speaker: 'You',
          message: 'What does your intuition tell you about this case?',
        },
        {
          time: '15:01',
          speaker: 'Jake',
          message:
            "Colors don't lie. I see a lot of gray areas, but also some stark contrasts.",
        },
        {
          time: '15:20',
          speaker: 'Jake',
          message:
            'Sometimes the most obvious answer is hiding in plain sight.',
        },
        {
          time: '15:21',
          speaker: 'You',
          message: 'Like a hidden image in a painting?',
        },
        {
          time: '15:22',
          speaker: 'Jake',
          message: 'Exactly! You just need to shift your perspective.',
        },
      ],
    },
    {
      id: 5,
      name: 'Dr. Amanda Foster',
      role: 'Psychologist',
      avatar: '/placeholder.svg?height=40&width=40',
      personality: 'Insightful, professional, observant',
      personas: [
        'The Analyst: Reads between the lines of behavior',
        'The Healer: Seeks to understand and help',
        'The Observer: Notices subtle patterns and cues',
        'The Guide: Helps others understand themselves',
      ],
      keyInsights: [
        'Analyzed behavioral patterns',
        'Asked about underlying motivations',
        'Provided psychological insights',
      ],
      conversationCount: 29,
      trustLevel: 91,
      analysis:
        "Dr. Foster's psychological expertise was apparent in her deep questions about motivations and her ability to read between the lines.",
      individualConversations: [
        {
          time: '14:35',
          speaker: 'Dr. Foster',
          message: "I'm observing some interesting group dynamics here.",
        },
        {
          time: '14:36',
          speaker: 'You',
          message: 'What kind of patterns are you seeing?',
        },
        {
          time: '14:37',
          speaker: 'Dr. Foster',
          message:
            'Defense mechanisms are activating. People are protecting themselves.',
        },
        {
          time: '15:05',
          speaker: 'You',
          message: 'What would drive someone to commit such an act?',
        },
        {
          time: '15:06',
          speaker: 'Dr. Foster',
          message:
            'Usually a combination of opportunity, pressure, and rationalization.',
        },
        {
          time: '15:25',
          speaker: 'Dr. Foster',
          message:
            'The perpetrator is likely experiencing significant cognitive dissonance right now.',
        },
        { time: '15:26', speaker: 'You', message: 'How might that manifest?' },
        {
          time: '15:27',
          speaker: 'Dr. Foster',
          message:
            'Inconsistent behavior, overcompensation, or complete withdrawal.',
        },
      ],
    },
  ];

  const fullConversationLog = [
    {
      time: '14:32',
      speaker: 'You',
      message:
        'I think we need to consider all the evidence before making a decision.',
    },
    {
      time: '14:33',
      speaker: 'Elena',
      message: "Agreed. Let's review what we know so far systematically.",
    },
    {
      time: '14:34',
      speaker: 'Marcus',
      message:
        'Time is money here. We need to act quickly on this opportunity.',
    },
    {
      time: '14:35',
      speaker: 'Sarah',
      message:
        'But we should also think about how this affects everyone involved.',
    },
    {
      time: '14:36',
      speaker: 'Jake',
      message: 'What if we approached this from a completely different angle?',
    },
    {
      time: '14:37',
      speaker: 'Dr. Foster',
      message: "I'm noticing some interesting patterns in our group dynamics.",
    },
    {
      time: '14:38',
      speaker: 'You',
      message: "That's a good point. What patterns are you seeing?",
    },
    {
      time: '14:39',
      speaker: 'Elena',
      message: 'We each bring different perspectives to problem-solving.',
    },
    {
      time: '14:40',
      speaker: 'Marcus',
      message: 'Diversity of thought is valuable, but we need decisive action.',
    },
    {
      time: '14:41',
      speaker: 'Sarah',
      message: "Let's make sure everyone feels heard before we decide.",
    },
    {
      time: '14:42',
      speaker: 'Jake',
      message: 'Sometimes the best solutions come from unexpected places.',
    },
    {
      time: '14:43',
      speaker: 'Dr. Foster',
      message: 'The stress is affecting our decision-making processes.',
    },
    {
      time: '14:44',
      speaker: 'You',
      message: 'How can we manage that stress effectively?',
    },
    {
      time: '14:45',
      speaker: 'Elena',
      message: 'Focus on facts, not emotions.',
    },
    {
      time: '14:46',
      speaker: 'Sarah',
      message: 'But emotions provide important information too.',
    },
  ];

  const handleRedirect = (direct: string) => {
    if (direct === 'game') {
      router.push('/game');
    } else {
      router.push('/');
    }
  };

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
                    {gameKeywords.map((keyword, index) => (
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
                  <div className="space-y-3">
                    {fullConversationLog.map((entry, index) => (
                      <div key={index} className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {entry.time} - {entry.speaker}
                        </div>
                        <p className="text-sm bg-muted p-2 rounded">
                          {entry.message}
                        </p>
                        {index < fullConversationLog.length - 1 && (
                          <Separator className="my-2" />
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
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Character Analysis
                </h2>

                {/* Character Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
                  {characters.map((character, index) => (
                    <Card
                      key={character.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedCharacter === index ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedCharacter(index)}
                    >
                      <CardContent className="p-3">
                        <div className="flex flex-col items-center text-center gap-2">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={character.avatar || '/placeholder.svg'}
                              alt={character.name}
                            />
                            <AvatarFallback>
                              {character.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">
                              {character.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {character.role}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <MessageSquare className="h-3 w-3" />
                            {character.conversationCount}
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
                        src={
                          characters[selectedCharacter].avatar ||
                          '/placeholder.svg' ||
                          '/placeholder.svg'
                        }
                        alt={characters[selectedCharacter].name}
                      />
                      <AvatarFallback>
                        {characters[selectedCharacter].name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>
                        {characters[selectedCharacter].name}
                      </CardTitle>
                      <CardDescription>
                        {characters[selectedCharacter].role}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="analysis" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="analysis">Analysis</TabsTrigger>
                      <TabsTrigger value="personas">Personas</TabsTrigger>
                      <TabsTrigger value="conversations">
                        Conversations
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="analysis" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-primary">
                            {characters[selectedCharacter].conversationCount}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Conversations
                          </div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {characters[selectedCharacter].trustLevel}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Trust Level
                          </div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            <TrendingUp className="h-6 w-6 mx-auto" />
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Engagement
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">
                          Personality Traits
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {characters[selectedCharacter].personality}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Key Insights</h4>
                        <ul className="space-y-1">
                          {characters[selectedCharacter].keyInsights.map(
                            (insight, index) => (
                              <li
                                key={index}
                                className="text-sm flex items-start gap-2"
                              >
                                <span className="text-primary">•</span>
                                {insight}
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Analysis Summary</h4>
                        <p className="text-sm text-muted-foreground">
                          {characters[selectedCharacter].analysis}
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="personas" className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Brain className="h-5 w-5" />
                        <h4 className="font-semibold">Character Personas</h4>
                      </div>
                      <div className="grid gap-3">
                        {characters[selectedCharacter].personas.map(
                          (persona, index) => (
                            <Card key={index} className="p-4">
                              <p className="text-sm">{persona}</p>
                            </Card>
                          )
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="conversations" className="space-y-4">
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
