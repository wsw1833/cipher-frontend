'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SpriteBot } from '../../components/bot';
import {
  AI_MOVE_DURATION_MAX,
  AI_MOVE_DURATION_MIN,
  AI_MOVE_SPEED,
  AI_PAUSE_DURATION_MAX,
  AI_PAUSE_DURATION_MIN,
  ANIMATION_FRAMES,
  BASE_CANVAS_HEIGHT,
  BASE_CANVAS_WIDTH,
  DIRECTIONS,
  FRAME_DURATION,
  WALKABLE_AREAS,
} from '../../utils/properties';
import { default as NextImage } from 'next/image';
import { Input } from '@/components/ui/input';
import BeerMug from '@images/beer-mug.svg';
import { SSESetup } from '@/actions/sse';

interface BotState {
  x: number;
  y: number;
  direction: 'up' | 'down' | 'left' | 'right';
  isMoving: boolean;
  message: string | null;
  messageTimeoutId?: NodeJS.Timeout;
  moveDirection?: { x: number; y: number };
  ai: {
    action: 'alive' | 'dead';
    actionEndTime: number;
  };
}

interface ChatMessage {
  id: string;
  message: string;
  timestamp: Date;
  botName: string;
}

interface CanvasDimensions {
  width: number;
  height: number;
  scaleFactor: number;
}

// Spawn points in walkable areas
const SPAWN_POINTS = [
  { x: 100, y: 400 }, // Bottom left area
  { x: 350, y: 250 }, // Center area
  { x: 600, y: 150 }, // Top right area
  { x: 350, y: 520 }, // Bottom center
  { x: 800, y: 350 }, // Right area
  { x: 150, y: 200 }, // Top left
  { x: 650, y: 500 }, // Bottom right
  { x: 450, y: 100 }, // Top center
];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Enhanced position validation
function isValidPosition(
  x: number,
  y: number,
  botStates: BotState[],
  excludeIndex = -1
): boolean {
  // Check canvas boundaries
  const margin = 20;
  if (
    x < margin ||
    x > BASE_CANVAS_WIDTH - margin ||
    y < margin ||
    y > BASE_CANVAS_HEIGHT - margin
  ) {
    return false;
  }

  // Check if in walkable area
  if (!SpriteBot.isInWalkableArea(x, y)) {
    return false;
  }

  // Check collision with other bots
  if (SpriteBot.checkBotCollision(x, y, botStates, excludeIndex)) {
    return false;
  }

  return true;
}

function getRandomDirection(): { x: number; y: number } {
  const directions = [
    { x: 0, y: -1 }, // up
    { x: 0, y: 1 }, // down
    { x: -1, y: 0 }, // left
    { x: 1, y: 0 }, // right
  ];
  return directions[Math.floor(Math.random() * directions.length)];
}

const Game = () => {
  const [isMessage, setIsMessage] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const botsRef = useRef<SpriteBot[] | null>(null);
  const botStatesRef = useRef<BotState[]>([]);
  const animationIdRef = useRef<number | null>(null);
  const backgroundImageRef = useRef<HTMLImageElement | null>(null);

  const [isInitialized, setIsInitialized] = useState(false);
  const [botStates, setBotStates] = useState<BotState[]>([]);
  const [animationFrame, setAnimationFrame] = useState<number>(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [canvasDimensions, setCanvasDimensions] = useState<CanvasDimensions>({
    width: BASE_CANVAS_WIDTH,
    height: BASE_CANVAS_HEIGHT,
    scaleFactor: 1,
  });

  // Load background image
  useEffect(() => {
    const loadBackground = async () => {
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
          backgroundImageRef.current = img;
          setBackgroundLoaded(true);
          console.log('Background image loaded successfully');
        };

        img.onerror = (error) => {
          console.error('Failed to load background image:', error);
          setBackgroundLoaded(false);
        };

        img.src = '/example.jpg';
      } catch (error) {
        console.error('Error loading background image:', error);
        setBackgroundLoaded(false);
      }
    };

    loadBackground();
  }, []);

  const updateCanvasSize = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.clientWidth - 32;
    const containerHeight = window.innerHeight - 200;

    const aspectRatio = BASE_CANVAS_WIDTH / BASE_CANVAS_HEIGHT;
    let newWidth = Math.min(containerWidth, 1000);
    let newHeight = newWidth / aspectRatio;

    if (newHeight > containerHeight) {
      newHeight = containerHeight;
      newWidth = containerHeight * aspectRatio;
    }

    const scaleFactor = Math.min(
      newWidth / BASE_CANVAS_WIDTH,
      newHeight / BASE_CANVAS_HEIGHT
    );

    setCanvasDimensions({
      width: newWidth,
      height: newHeight,
      scaleFactor,
    });
  }, []);

  useEffect(() => {
    updateCanvasSize();
    const handleResize = () => updateCanvasSize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateCanvasSize]);

  const handleBotMessage = useCallback((index: number, message: string) => {
    setBotStates((prevStates) => {
      const newStates = [...prevStates];
      const currentState = newStates[index];

      if (currentState?.messageTimeoutId) {
        clearTimeout(currentState.messageTimeoutId);
      }

      const timeoutId = setTimeout(() => {
        setBotStates((states) => {
          const clearedStates = [...states];
          if (clearedStates[index]) {
            clearedStates[index] = {
              ...clearedStates[index],
              message: null,
              messageTimeoutId: undefined,
            };
          }
          return clearedStates;
        });
      }, 5000);

      newStates[index] = {
        ...currentState,
        message: message,
        messageTimeoutId: timeoutId,
      };

      botStatesRef.current = newStates;
      return newStates;
    });

    if (message.trim()) {
      const botName = botsRef.current?.[index]?.name || `Bot ${index}`;
      setChatMessages((prev) =>
        [
          ...prev,
          {
            id: crypto.randomUUID(),
            message: message,
            timestamp: new Date(),
            botName: botName,
          },
        ].slice(-100)
      );
    }
  }, []);

  const drawBackground = useCallback(
    (ctx: CanvasRenderingContext2D, scaleFactor: number) => {
      if (backgroundLoaded && backgroundImageRef.current) {
        // Draw the background image
        ctx.drawImage(
          backgroundImageRef.current,
          0,
          0,
          BASE_CANVAS_WIDTH * scaleFactor,
          BASE_CANVAS_HEIGHT * scaleFactor
        );

        // Draw walkable area overlays (semi-transparent for debugging)
        if (process.env.NODE_ENV === 'development') {
          ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
          WALKABLE_AREAS.forEach((area) => {
            ctx.fillRect(
              area.x * scaleFactor,
              area.y * scaleFactor,
              area.width * scaleFactor,
              area.height * scaleFactor
            );
          });
        }
      } else {
        // Fallback background
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(
          0,
          0,
          BASE_CANVAS_WIDTH * scaleFactor,
          BASE_CANVAS_HEIGHT * scaleFactor
        );

        // Draw walkable areas as green rectangles
        ctx.fillStyle = '#228B22';
        WALKABLE_AREAS.forEach((area) => {
          ctx.fillRect(
            area.x * scaleFactor,
            area.y * scaleFactor,
            area.width * scaleFactor,
            area.height * scaleFactor
          );
        });
      }
    },
    [backgroundLoaded]
  );

  const drawGame = useCallback(() => {
    if (
      !isInitialized ||
      !canvasRef.current ||
      !botsRef.current ||
      botStatesRef.current.length === 0
    ) {
      return;
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const { scaleFactor } = canvasDimensions;

    ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);

    // Draw background
    drawBackground(ctx, scaleFactor);

    // Draw each bot
    botsRef.current.forEach((bot, index) => {
      const botState = botStatesRef.current[index];
      if (!botState) return;

      bot.draw(
        ctx,
        botState.x,
        botState.y,
        botState.direction,
        animationFrame,
        botState.isMoving,
        scaleFactor,
        botState.message
      );
    });
  }, [isInitialized, animationFrame, canvasDimensions, drawBackground]);

  // Initialize bots
  useEffect(() => {
    const initializeGame = () => {
      if (!botsRef.current) {
        const botConfigs = [
          { name: 'Alice', personality: 'helpful' },
          { name: 'Bob', personality: 'friendly' },
          { name: 'Cindy', personality: 'creative' },
          { name: 'Dom', personality: 'analytical' },
          { name: 'Elise', personality: 'explorer' },
        ];

        botsRef.current = botConfigs.map(
          (config, index) =>
            new SpriteBot(
              index,
              config.name,
              config.personality,
              handleBotMessage
            )
        );
      }

      const initialBotStates: BotState[] = [];

      botsRef.current.forEach((_, index) => {
        const spawnPoint = SPAWN_POINTS[index % SPAWN_POINTS.length];
        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 30;

        initialBotStates.push({
          x: spawnPoint.x + offsetX,
          y: spawnPoint.y + offsetY,
          direction: DIRECTIONS[index % DIRECTIONS.length],
          isMoving: false,
          message: null,
          ai: {
            action: 'alive',
            actionEndTime:
              Date.now() +
              getRandomInt(AI_PAUSE_DURATION_MIN, AI_PAUSE_DURATION_MAX),
          },
        });
      });

      botStatesRef.current = initialBotStates;
      setBotStates(initialBotStates);
      setIsInitialized(true);
    };

    if (backgroundLoaded) {
      initializeGame();
    }

    return () => {
      if (botsRef.current) {
        botsRef.current.forEach((bot) => bot.destroy?.());
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [handleBotMessage, backgroundLoaded]);

  // Animation loop
  useEffect(() => {
    if (!isInitialized) return;

    let lastUpdateTime = 0;
    let lastFrameTime = 0;

    const animate = (timestamp: number) => {
      if (lastUpdateTime === 0) {
        lastUpdateTime = timestamp;
        lastFrameTime = timestamp;
      }

      const deltaTime = timestamp - lastUpdateTime;
      const frameDelta = timestamp - lastFrameTime;

      if (frameDelta >= FRAME_DURATION) {
        setAnimationFrame((prev) => (prev + 1) % (ANIMATION_FRAMES * 15));
        lastFrameTime = timestamp;
      }

      const currentBotStates = [...botStatesRef.current];
      let stateChanged = false;

      currentBotStates.forEach((botState, index) => {
        const now = Date.now();

        // Only process AI for alive bots
        if (botState.ai.action === 'dead') {
          botState.isMoving = false;
          return;
        }

        if (now >= botState.ai.actionEndTime) {
          if (!botState.isMoving) {
            // Start moving
            botState.moveDirection = getRandomDirection();
            botState.ai.actionEndTime =
              now + getRandomInt(AI_MOVE_DURATION_MIN, AI_MOVE_DURATION_MAX);
            botState.isMoving = true;

            if (
              Math.abs(botState.moveDirection.x) >
              Math.abs(botState.moveDirection.y)
            ) {
              botState.direction =
                botState.moveDirection.x > 0 ? 'right' : 'left';
            } else {
              botState.direction = botState.moveDirection.y > 0 ? 'down' : 'up';
            }

            stateChanged = true;
          } else {
            // Stop moving (pause)
            botState.ai.actionEndTime =
              now + getRandomInt(AI_PAUSE_DURATION_MIN, AI_PAUSE_DURATION_MAX);
            botState.isMoving = false;
            botState.moveDirection = undefined;
            stateChanged = true;
          }
        }

        // Handle movement for alive bots
        if (
          botState.ai.action === 'alive' &&
          botState.isMoving &&
          botState.moveDirection
        ) {
          const moveSpeed = AI_MOVE_SPEED * (deltaTime / 16.67);
          const newX = botState.x + botState.moveDirection.x * moveSpeed;
          const newY = botState.y + botState.moveDirection.y * moveSpeed;

          if (isValidPosition(newX, newY, currentBotStates, index)) {
            botState.x = newX;
            botState.y = newY;
            stateChanged = true;
          } else {
            // Try to find a new valid direction
            let attempts = 0;
            let foundValidDirection = false;

            while (attempts < 8 && !foundValidDirection) {
              const newDirection = getRandomDirection();
              const testX = botState.x + newDirection.x * moveSpeed;
              const testY = botState.y + newDirection.y * moveSpeed;

              if (isValidPosition(testX, testY, currentBotStates, index)) {
                botState.moveDirection = newDirection;

                if (Math.abs(newDirection.x) > Math.abs(newDirection.y)) {
                  botState.direction = newDirection.x > 0 ? 'right' : 'left';
                } else {
                  botState.direction = newDirection.y > 0 ? 'down' : 'up';
                }

                foundValidDirection = true;
              }
              attempts++;
            }

            if (!foundValidDirection) {
              botState.ai.actionEndTime = now + getRandomInt(1000, 2000);
              botState.isMoving = false;
              botState.moveDirection = undefined;
            }

            stateChanged = true;
          }
        }
      });

      if (stateChanged) {
        botStatesRef.current = currentBotStates;
        setBotStates([...currentBotStates]);
      }

      lastUpdateTime = timestamp;
      drawGame();
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
    };
  }, [isInitialized, drawGame]);

  //stream and game API logic
  useEffect(() => {
    const gameID = localStorage.getItem('gameID');
    if (!gameID) {
      console.error('No gameID found in localStorage');
      return;
    }

    const eventSource = SSESetup(gameID);
  }, []);

  return (
    <div className="min-h-screen bg-[#15130A] p-2 md:p-4">
      <div className="flex flex-col lg:flex-row gap-4 max-w-7xl mx-auto">
        <div
          ref={containerRef}
          className="flex-1 bg-[#262012] rounded-xl shadow-xl p-6 min-h-0"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
            <h1 className="flex flex-row items-center gap-2 text-2xl md:text-3xl text-white font-bold bg-clip-text">
              <NextImage
                src={BeerMug}
                alt="beermug"
                className="w-10 h-10"
                priority
              />
              CipherWolves
            </h1>
            <div className="text-sm text-white px-3 py-1">
              Scale: {canvasDimensions.scaleFactor.toFixed(2)}x •{' '}
              {botStates.filter((s) => s.ai.action === 'alive').length} alive
            </div>
          </div>

          {!isInitialized ? (
            <div className="flex items-center justify-center h-64 md:h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-2 mx-auto mb-4"></div>
                <div className="text-lg font-medium text-gray-700">
                  Loading map...
                </div>
                <div className="text-sm text-white mt-2">
                  {backgroundLoaded
                    ? 'Setting up characters...'
                    : 'Loading background...'}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <canvas
                ref={canvasRef}
                width={canvasDimensions.width}
                height={canvasDimensions.height}
                className="border-2 border-[#15130A] rounded-lg shadow-lg"
                style={{
                  width: canvasDimensions.width,
                  height: canvasDimensions.height,
                  imageRendering: 'pixelated',
                }}
              />
            </div>
          )}

          {/* Bot Info Grid */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3 text-sm ">
            {botsRef.current?.slice(0, 6).map((bot, index) => (
              <div
                key={bot.name}
                className="bg-[#15130A] p-3 rounded-lg border-2 border-[#15130A]"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white"
                    style={{ backgroundColor: bot.color }}
                  ></div>
                  <div className="font-semibold text-white">{bot.name}</div>
                </div>
                <div className="text-xs text-white capitalize">
                  {bot.personality}
                </div>
                <div className="text-xs text-white mt-1">
                  {botStates[index]?.ai.action === 'alive'
                    ? botStates[index]?.isMoving
                      ? '🚶 Moving'
                      : '⏸️ Resting'
                    : '💀 Dead'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Panel */}
        <div className="w-full lg:w-110 bg-[#262012] rounded-xl shadow-xl p-6 flex flex-col">
          <div className="flex flex-row items-center gap-2 mb-4">
            <h3 className="flex flex-row items-center gap-2 text-xl font-bold text-white">
              <NextImage
                src={BeerMug}
                alt="beermug"
                className="w-8 h-8"
                priority
              />
              Town Chat
            </h3>
            <div className="bg-[#E9DC56] text-black font-semibold text-xs lg:text-sm px-2 py-1 rounded-full">
              {chatMessages.length} messages
            </div>
          </div>

          <div className="flex-1 min-h-0 mt-4">
            <div className="h-80 lg:h-120 overflow-y-auto border border-black rounded-lg p-3 space-y-3 bg-[#15130A]">
              {chatMessages.length === 0 ? (
                <div className="text-white text-center py-12">
                  <div className="text-4xl mb-2">🏰</div>
                  <div className="font-medium">
                    Waiting for town conversations...
                  </div>
                  <div className="text-sm mt-1">
                    characters will start chatting soon!
                  </div>
                </div>
              ) : (
                chatMessages.map((msg) => {
                  const bot = botsRef.current?.find(
                    (b) => b.name === msg.botName.split(':')[0]
                  );
                  return (
                    <div
                      key={msg.id}
                      className="bg-[#44381CFF] p-3 rounded-lg shadow-sm border-l-4"
                      style={{ borderLeftColor: bot?.color || '#ccc' }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: bot?.color || '#ccc' }}
                          ></div>
                          <div className="text-sm font-semibold text-white">
                            {msg.botName.split(':')[0]}
                          </div>
                        </div>
                        <div className="text-xs text-gray-100">
                          {msg.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                      <div className=" text-gray-50 leading-relaxed">
                        {msg.message}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="mt-10 text-white">
              <Input
                className="text-white placholder:text-[#ffffff] bg-[#15130A] border-2 border-[#15130A] focus-visible:border-[#262012] focus-visible:ring-[#15130A]"
                disabled={isMessage}
                placeholder="Enter some useful info for the agents"
              />
            </div>
            <div className="mt-10 grid grid-cols-2 text-xs">
              <div className="bg-[#15130A] p-2 rounded-md border-2 border-[#15130A]">
                <div className="text-md font-medium text-gray-50">
                  Alive Agents
                </div>
                <div className="text-xl font-bold text-amber-600">
                  {botStates.filter((s) => s.ai.action === 'alive').length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
