export const BASE_CANVAS_WIDTH = 1200;
export const BASE_CANVAS_HEIGHT = 800;
export const SPRITE_SIZE = 48;
export const TILE_SIZE = 32;
export const MAP_OFFSET_X = 0;
export const MAP_OFFSET_Y = 0;

// Animation settings
export const ANIMATION_FRAMES = 16;
export const FRAME_DURATION = 50; // Slower for better visibility

// Movement settings
export const AI_MOVE_SPEED = 1.2;
export const BOT_COLLISION_RADIUS = 16; // Radius for bot-to-bot collision

// AI behavior settings
export const AI_MOVE_DURATION_MIN = 2000;
export const AI_MOVE_DURATION_MAX = 6000;
export const AI_PAUSE_DURATION_MIN = 1000;
export const AI_PAUSE_DURATION_MAX = 3000;

// Directions - Updated for your sprite sheet layout
export const DIRECTIONS = ['down', 'left', 'right', 'up'] as const;

// Walkable areas - Define areas where characters can walk
// This is a simplified collision map - you can make this more sophisticated
export const WALKABLE_AREAS = [
  // Define rectangular walkable zones [x, y, width, height]
  { x: 50, y: 350, width: 200, height: 100 }, // Bottom left area
  { x: 300, y: 200, width: 150, height: 200 }, // Center area
  { x: 500, y: 100, width: 200, height: 150 }, // Top right area
  { x: 200, y: 500, width: 300, height: 80 }, // Bottom center
  { x: 750, y: 300, width: 180, height: 120 }, // Right area
  { x: 100, y: 150, width: 120, height: 100 }, // Top left
  { x: 600, y: 450, width: 150, height: 100 }, // Bottom right
  { x: 400, y: 50, width: 100, height: 80 }, // Top center
];

// Map data for collision detection (simplified)
// 0 = walkable, 1 = obstacle
export const MAP_DATA = Array(25)
  .fill(null)
  .map(() => Array(38).fill(0));

// Add some obstacles based on the medieval town layout
for (let y = 0; y < 25; y++) {
  for (let x = 0; x < 38; x++) {
    // Border walls
    if (x === 0 || x === 37 || y === 0 || y === 24) {
      MAP_DATA[y][x] = 1;
    }

    // Add some building obstacles (simplified representation)
    if (
      (x >= 5 && x <= 15 && y >= 3 && y <= 8) || // Building 1
      (x >= 20 && x <= 30 && y >= 5 && y <= 12) || // Building 2
      (x >= 8 && x <= 18 && y >= 15 && y <= 20) || // Building 3
      (x >= 25 && x <= 35 && y >= 16 && y <= 22)
    ) {
      // Building 4
      MAP_DATA[y][x] = 1;
    }
  }
}
