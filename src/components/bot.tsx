import {
  SPRITE_SIZE,
  BOT_COLLISION_RADIUS,
  WALKABLE_AREAS,
} from '../utils/properties';

export class SpriteBot {
  public index: number;
  public name: string;
  public personality: string;
  public color: string;
  private messageInterval: NodeJS.Timeout | null = null;
  private spriteImage: HTMLImageElement | null = null;
  private imageLoaded = false;

  // Sprite sheet configuration for your layout
  private readonly SPRITE_FRAME_WIDTH = 34;
  private readonly SPRITE_FRAME_HEIGHT = 54;
  private readonly FRAMES_PER_DIRECTION = 4;

  // Direction mapping to sprite sheet rows (down, left, right, up)
  private readonly DIRECTION_ROWS = {
    down: 0,
    right: 1,
    left: 2,
    up: 3,
  };

  constructor(
    index: number,
    name: string,
    personality: string,
    private onMessage: (index: number, message: string) => void
  ) {
    this.index = index;
    this.name = name;
    this.personality = personality;

    // Assign unique colors for name tags and UI elements
    const colors = [
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#96CEB4',
      '#FFEAA7',
      '#DDA0DD',
      '#98FB98',
      '#F0E68C',
    ];
    this.color = colors[index % colors.length];

    this.loadSpriteSheet();
    this.startBehavior();
  }

  private async loadSpriteSheet() {
    try {
      this.spriteImage = new Image();
      this.spriteImage.crossOrigin = 'anonymous';

      this.spriteImage.onload = () => {
        this.imageLoaded = true;
        console.log(`Sprite sheet loaded for ${this.name}`);
      };

      this.spriteImage.onerror = (error) => {
        console.error(
          `Failed to
           load sprite sheet for ${this.name}:`,
          error
        );
        this.imageLoaded = false;
      };

      this.spriteImage.src = '/sprite.png';
    } catch (error) {
      console.error(`Error loading sprite sheet for ${this.name}:`, error);
      this.imageLoaded = false;
    }
  }

  private startBehavior() {
    const sendMessage = () => {
      const personalityMessages = {
        friendly: [
          'Welcome to our medieval town! 🏰',
          'Beautiful day in the village!',
          'Anyone need directions around town?',
          'Love the cobblestone streets here!',
          'The market square is bustling today!',
        ],
        analytical: [
          'Analyzing optimal patrol routes...',
          'Town layout efficiency: 87%',
          'Monitoring foot traffic patterns.',
          'Security perimeter established.',
          'Data collection in progress.',
        ],
        creative: [
          'This architecture inspires me! ✨',
          'The stonework is magnificent!',
          'I see stories in every building.',
          'What tales these walls could tell!',
          'Art is everywhere in this town!',
        ],
        helpful: [
          'Need help finding anything? 🤝',
          'I know all the best shops here!',
          'Let me show you around town!',
          'The inn serves excellent meals!',
          'Happy to assist fellow travelers!',
        ],
        explorer: [
          'Discovering hidden alleyways! 🗺️',
          'Every corner holds new secrets!',
          'The town has such rich history!',
          'Adventure awaits beyond those walls!',
          'Exploring every nook and cranny!',
        ],
      };

      const messages =
        personalityMessages[
          this.personality as keyof typeof personalityMessages
        ] || personalityMessages.friendly;
      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];

      this.onMessage(this.index, randomMessage);

      const nextMessageTime = Math.random() * 15000 + 10000; // 10-25 seconds
      this.messageInterval = setTimeout(sendMessage, nextMessageTime);
    };

    const initialDelay = Math.random() * 8000 + 3000; // 3-11 seconds
    this.messageInterval = setTimeout(sendMessage, initialDelay);
  }

  // Calculate sprite frame based on direction and animation (left to right)
  private getSpriteFrame(
    direction: string,
    animationFrame: number,
    isMoving: boolean
  ): { row: number; col: number } {
    const row =
      this.DIRECTION_ROWS[direction as keyof typeof this.DIRECTION_ROWS] || 0;

    if (!isMoving) {
      return { row, col: 0 }; // Standing frame
    }

    // Walking animation: left to right, 4 frames
    const walkCycle =
      Math.floor(animationFrame / 8) % this.FRAMES_PER_DIRECTION;
    return { row, col: walkCycle };
  }

  // Check if position is in a walkable area
  public static isInWalkableArea(x: number, y: number): boolean {
    return WALKABLE_AREAS.some(
      (area) =>
        x >= area.x &&
        x <= area.x + area.width &&
        y >= area.y &&
        y <= area.y + area.height
    );
  }

  // Check collision with other bots
  public static checkBotCollision(
    x: number,
    y: number,
    botStates: any[],
    excludeIndex: number
  ): boolean {
    for (let i = 0; i < botStates.length; i++) {
      if (i === excludeIndex) continue;

      const otherBot = botStates[i];
      if (!otherBot) continue;

      const distance = Math.sqrt(
        Math.pow(x - otherBot.x, 2) + Math.pow(y - otherBot.y, 2)
      );

      if (distance < BOT_COLLISION_RADIUS * 2) {
        return true; // Collision detected
      }
    }
    return false;
  }

  private drawSprite(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    direction: string,
    animationFrame: number,
    isMoving: boolean,
    scaleFactor: number
  ) {
    if (!this.imageLoaded || !this.spriteImage) {
      this.drawFallbackSprite(ctx, x, y, scaleFactor);
      return;
    }

    const { row, col } = this.getSpriteFrame(
      direction,
      animationFrame,
      isMoving
    );

    const sourceX = col * this.SPRITE_FRAME_WIDTH;
    const sourceY = row * this.SPRITE_FRAME_HEIGHT;

    const destWidth = SPRITE_SIZE * scaleFactor;
    const destHeight = SPRITE_SIZE * scaleFactor;
    const destX = x - destWidth / 2;
    const destY = y - destHeight / 2;

    try {
      ctx.drawImage(
        this.spriteImage,
        sourceX,
        sourceY,
        this.SPRITE_FRAME_WIDTH,
        this.SPRITE_FRAME_HEIGHT,
        destX,
        destY,
        destWidth,
        destHeight
      );
    } catch (error) {
      console.error(`Error drawing sprite for ${this.name}:`, error);
      this.drawFallbackSprite(ctx, x, y, scaleFactor);
    }
  }

  private drawFallbackSprite(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    scaleFactor: number
  ) {
    const size = SPRITE_SIZE * scaleFactor;

    ctx.fillStyle = this.color;
    ctx.fillRect(x - size / 2, y - size / 2, size, size * 0.8);

    // Simple face
    ctx.fillStyle = '#000';
    const eyeSize = 3 * scaleFactor;
    ctx.fillRect(x - 8 * scaleFactor, y - 8 * scaleFactor, eyeSize, eyeSize);
    ctx.fillRect(x + 5 * scaleFactor, y - 8 * scaleFactor, eyeSize, eyeSize);
    ctx.fillRect(
      x - 6 * scaleFactor,
      y - 2 * scaleFactor,
      12 * scaleFactor,
      2 * scaleFactor
    );
  }

  public draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    direction: string,
    animationFrame: number,
    isMoving: boolean,
    scaleFactor: number,
    message?: string | null
  ) {
    const scaledX = x * scaleFactor;
    const scaledY = y * scaleFactor;
    const scaledSize = SPRITE_SIZE * scaleFactor;

    // Draw character shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(
      scaledX,
      scaledY + scaledSize * 0.4,
      scaledSize * 0.3,
      scaledSize * 0.15,
      0,
      0,
      2 * Math.PI
    );
    ctx.fill();

    // Draw the sprite
    this.drawSprite(
      ctx,
      scaledX,
      scaledY,
      direction,
      animationFrame,
      isMoving,
      scaleFactor
    );

    // Draw collision radius (debug - can be removed)
    if (process.env.NODE_ENV === 'development') {
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(
        scaledX,
        scaledY,
        BOT_COLLISION_RADIUS * scaleFactor,
        0,
        2 * Math.PI
      );
      ctx.stroke();
    }

    // Draw message bubble if there's a message
    if (message) {
      this.drawMessageBubble(
        ctx,
        scaledX,
        scaledY,
        scaledSize,
        '...',
        scaleFactor
      );
    }

    // Draw name tag
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.font = `bold ${14 * scaleFactor}px Arial`;
    ctx.textAlign = 'center';
    const nameY = scaledY - scaledSize / 2 - 6 * scaleFactor;

    const nameWidth = ctx.measureText(this.name).width;
    ctx.fillRect(
      scaledX - nameWidth / 2 - 3 * scaleFactor,
      nameY - 10 * scaleFactor,
      nameWidth + 7 * scaleFactor,
      14 * scaleFactor
    );

    ctx.fillStyle = '#FFF';
    ctx.fillText(this.name, scaledX, nameY);

    if (!this.imageLoaded) {
      ctx.fillStyle = 'rgba(255, 255, 0, 0.7)';
      ctx.font = `${7 * scaleFactor}px Arial`;
      ctx.fillText(
        'Loading...',
        scaledX,
        scaledY + scaledSize / 2 + 12 * scaleFactor
      );
    }
  }

  private drawMessageBubble(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    message: string,
    scaleFactor: number
  ) {
    const maxWidth = 180 * scaleFactor;
    const padding = 10 * scaleFactor;
    const lineHeight = 14 * scaleFactor;

    ctx.font = `${20 * scaleFactor}px Arial`;
    const words = message.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth - padding * 2 && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);

    const bubbleWidth = Math.min(
      maxWidth,
      Math.max(...lines.map((line) => ctx.measureText(line).width)) +
        padding * 2
    );
    const bubbleHeight = lines.length * lineHeight + padding * 2;
    const bubbleX = x - bubbleWidth / 2;
    const bubbleY = y - size / 2 - bubbleHeight - 15 * scaleFactor;

    // Draw bubble
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.beginPath();
    ctx.roundRect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 6 * scaleFactor);
    ctx.fill();

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1.5 * scaleFactor;
    ctx.stroke();

    // Draw pointer
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2 - 8 * scaleFactor);
    ctx.lineTo(x - 6 * scaleFactor, bubbleY + bubbleHeight);
    ctx.lineTo(x + 6 * scaleFactor, bubbleY + bubbleHeight);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.fill();
    ctx.stroke();

    // Draw text
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    lines.forEach((line, index) => {
      ctx.fillText(
        line,
        bubbleX + bubbleWidth / 2,
        bubbleY + padding + (index + 1) * lineHeight - 3 * scaleFactor
      );
    });
  }

  public destroy() {
    if (this.messageInterval) {
      clearTimeout(this.messageInterval);
      this.messageInterval = null;
    }
  }
}
