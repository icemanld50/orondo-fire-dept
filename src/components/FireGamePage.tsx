import React, { useRef, useEffect, useState, useMemo } from 'react';
import { 
  Flame, 
  Plane, 
  RotateCcw, 
  Trophy, 
  Volume2, 
  VolumeX, 
  Shield, 
  Coins, 
  Heart,
  Play,
  FastForward,
  Trash2,
  Crosshair,
  Zap
} from 'lucide-react';

// ============================================================================
// BLOONS TD 5 STYLE FIREFIGHTING TYPES & INTERFACES
// ============================================================================

export type TargetPriority = 'first' | 'last' | 'strongest' | 'close';

export interface PathWaypoint {
  x: number;
  y: number;
}

export interface FireDefinition {
  tier: number;
  name: string;
  hp: number;
  speed: number;
  reward: number;
  radius: number;
  color: string;
  coreColor: string;
  isArmored?: boolean;
  isBoss?: boolean;
}

export interface ActiveFire {
  id: string;
  tier: number;
  hp: number;
  maxHp: number;
  speed: number;
  reward: number;
  distanceTraveled: number; // Pixels along path
  x: number;
  y: number;
  radius: number;
  color: string;
  coreColor: string;
  isArmored: boolean;
  isBoss: boolean;
  slowTimer: number; // Frames remaining of foam slow
}

export interface TowerUpgrade {
  name: string;
  cost: number;
  desc: string;
}

export interface TowerTypeConfig {
  id: string;
  name: string;
  cost: number;
  role: string;
  desc: string;
  range: number;
  attackInterval: number; // Frames between shots at 60fps
  pierce: number;
  damage: number;
  splashRadius: number;
  isWaterOnly?: boolean;
  isPassiveTrap?: boolean;
  trapMaxHits?: number;
  path1: TowerUpgrade[];
  path2: TowerUpgrade[];
}

export interface PlacedTower {
  id: string;
  typeId: string;
  x: number;
  y: number;
  angle: number;
  range: number;
  attackInterval: number;
  cooldownTimer: number;
  pierce: number;
  damage: number;
  splashRadius: number;
  targeting: TargetPriority;
  kills: number;
  investedCost: number;
  path1Tier: number; // 0, 1, 2, 3
  path2Tier: number; // 0, 1, 2, 3
  trapHitsLeft?: number;
  isWaterOnly?: boolean;
  isPassiveTrap?: boolean;
}

export interface WaterProjectile {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  radius: number;
  pierceLeft: number;
  damage: number;
  distanceTraveled: number;
  maxDistance: number;
  splashRadius: number;
  isFoam?: boolean;
  isSprinklerMist?: boolean;
  hitFireIds: Set<string>;
}

export interface RetardantLine {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  timeLeft: number;
}

export interface AirTankerStrike {
  active: boolean;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  dropped: boolean;
}

export interface ParticleEffect {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
  life: number;
  maxLife: number;
}

// ============================================================================
// MAP GEOMETRY & TRACK WAYPOINTS (840 x 540)
// ============================================================================

export const TRACK_WAYPOINTS: PathWaypoint[] = [
  { x: -20, y: 100 },
  { x: 230, y: 100 },
  { x: 230, y: 240 },
  { x: 90, y: 240 },
  { x: 90, y: 440 },
  { x: 440, y: 440 }, // Crosses Columbia River Wooden Bridge
  { x: 440, y: 150 },
  { x: 630, y: 150 },
  { x: 630, y: 370 },
  { x: 750, y: 370 },
  { x: 750, y: 560 }, // Exits at Station 241 Headquarters
];

// Precompute cumulative lengths of track segments
export const SEGMENT_LENGTHS: number[] = [];
export const CUMULATIVE_LENGTHS: number[] = [0];

for (let i = 0; i < TRACK_WAYPOINTS.length - 1; i++) {
  const p1 = TRACK_WAYPOINTS[i];
  const p2 = TRACK_WAYPOINTS[i + 1];
  const len = Math.hypot(p2.x - p1.x, p2.y - p1.y);
  SEGMENT_LENGTHS.push(len);
  CUMULATIVE_LENGTHS.push(CUMULATIVE_LENGTHS[i] + len);
}

export const TOTAL_TRACK_LENGTH = CUMULATIVE_LENGTHS[CUMULATIVE_LENGTHS.length - 1];

// Function to interpolate coordinate along track
export const getCoordinateAtDistance = (dist: number): { x: number; y: number } => {
  if (dist <= 0) return { x: TRACK_WAYPOINTS[0].x, y: TRACK_WAYPOINTS[0].y };
  if (dist >= TOTAL_TRACK_LENGTH) {
    const last = TRACK_WAYPOINTS[TRACK_WAYPOINTS.length - 1];
    return { x: last.x, y: last.y };
  }

  // Find segment
  for (let i = 0; i < SEGMENT_LENGTHS.length; i++) {
    const segStart = CUMULATIVE_LENGTHS[i];
    const segEnd = CUMULATIVE_LENGTHS[i + 1];
    if (dist >= segStart && dist <= segEnd) {
      const segLen = SEGMENT_LENGTHS[i];
      const progress = (dist - segStart) / segLen;
      const p1 = TRACK_WAYPOINTS[i];
      const p2 = TRACK_WAYPOINTS[i + 1];
      return {
        x: p1.x + (p2.x - p1.x) * progress,
        y: p1.y + (p2.y - p1.y) * progress,
      };
    }
  }

  const last = TRACK_WAYPOINTS[TRACK_WAYPOINTS.length - 1];
  return { x: last.x, y: last.y };
};

// ============================================================================
// FIRE DEFINITIONS (BLOONS TIERS IN FIREFIGHTING THEME)
// ============================================================================

export const FIRE_TIERS: Record<number, FireDefinition> = {
  1: {
    tier: 1,
    name: 'Red Grass Spark',
    hp: 1,
    speed: 1.35,
    reward: 1,
    radius: 11,
    color: '#ef4444',
    coreColor: '#fca5a5',
  },
  2: {
    tier: 2,
    name: 'Blue Campfire Blaze',
    hp: 2,
    speed: 1.7,
    reward: 1,
    radius: 13,
    color: '#3b82f6',
    coreColor: '#93c5fd',
  },
  3: {
    tier: 3,
    name: 'Green Brush Fire',
    hp: 3,
    speed: 2.1,
    reward: 1,
    radius: 15,
    color: '#22c55e',
    coreColor: '#86efac',
  },
  4: {
    tier: 4,
    name: 'Yellow Crown Fire',
    hp: 4,
    speed: 2.7,
    reward: 1,
    radius: 17,
    color: '#eab308',
    coreColor: '#fef08a',
  },
  5: {
    tier: 5,
    name: 'Pink Timber Flame',
    hp: 5,
    speed: 3.3,
    reward: 1,
    radius: 18,
    color: '#ec4899',
    coreColor: '#fbcfe8',
  },
  6: {
    tier: 6,
    name: 'Charcoal Armored Slash',
    hp: 7,
    speed: 1.25,
    reward: 2,
    radius: 20,
    color: '#334155',
    coreColor: '#f97316',
    isArmored: true,
  },
  7: {
    tier: 7,
    name: 'Canyon Firestorm',
    hp: 12,
    speed: 2.35,
    reward: 3,
    radius: 23,
    color: '#991b1b',
    coreColor: '#fbbf24',
  },
  8: {
    tier: 8,
    name: 'Badger Mountain Inferno (BOSS)',
    hp: 95,
    speed: 0.85,
    reward: 45,
    radius: 34,
    color: '#7f1d1d',
    coreColor: '#f59e0b',
    isBoss: true,
  },
};

// ============================================================================
// TOWER CONFIGURATIONS (BLOONS TD 5 STYLE TOWER STORE & 2 UPGRADE PATHS)
// ============================================================================

export const TOWER_CONFIGS: TowerTypeConfig[] = [
  {
    id: 'hose-volunteer',
    name: 'Hose Volunteer',
    cost: 175,
    role: 'Standard Attack',
    desc: 'Quick handline water bursts. High versatility and dependable frontline attack.',
    range: 115,
    attackInterval: 38, // ~1.5 shots/sec
    pierce: 1,
    damage: 1,
    splashRadius: 0,
    path1: [
      { name: 'Brass Fog Tip', cost: 110, desc: '+30% Faster water spray rate.' },
      { name: 'Twin Handlines', cost: 230, desc: 'Fires dual parallel water jets simultaneously.' },
      { name: 'High-Pressure Hydro Blast', cost: 540, desc: 'High velocity blast with +3 Pierce and +1 Damage.' },
    ],
    path2: [
      { name: 'Extended Hose Reel', cost: 95, desc: '+35px Increased attack range.' },
      { name: 'AFFF Wetting Foam', cost: 240, desc: 'Foam coats fires, slowing speed by 40% for 2s.' },
      { name: 'Rapid Response Deluge', cost: 580, desc: 'Massive range boost and continuous hose pressure.' },
    ],
  },
  {
    id: 'deck-gun',
    name: 'Deck Gun Monitor',
    cost: 350,
    role: 'Heavy Cannon / Splash',
    desc: 'Roof-mounted master stream. Delivers heavy water blasts with explosive area splash.',
    range: 140,
    attackInterval: 64, // ~0.9 shots/sec
    pierce: 4,
    damage: 2,
    splashRadius: 32,
    path1: [
      { name: 'Smooth-Bore Solid Tip', cost: 150, desc: '+2 Extra damage to primary target.' },
      { name: 'Hydro-Ram Reservoir', cost: 320, desc: 'Expands splash radius to 52px and +3 pierce.' },
      { name: 'Station 241 Master Stream', cost: 760, desc: 'Massive hydro bomb that pops armored charcoal fires.' },
    ],
    path2: [
      { name: 'Swivel Turret Bearing', cost: 120, desc: '+40% Faster turret tracking rotation.' },
      { name: 'Telescopic Mast', cost: 260, desc: '+55px Tower elevation and range.' },
      { name: 'Twin Deluge Cannons', cost: 820, desc: 'Fires alternating rapid hydro shells.' },
    ],
  },
  {
    id: 'perimeter-sprinkler',
    name: 'Perimeter Sprinkler',
    cost: 240,
    role: '360° Radial Area Defense',
    desc: 'WUI Structure Protection Sprinkler. Emits an 8-way radial ring of mist in all directions.',
    range: 85,
    attackInterval: 55,
    pierce: 2,
    damage: 1,
    splashRadius: 0,
    path1: [
      { name: '12-Nozzle Manifold', cost: 130, desc: 'Shoots 12 radial streams instead of 8.' },
      { name: 'Rapid Oscillator', cost: 260, desc: '+45% Faster rotation and trigger frequency.' },
      { name: 'Mist Hurricane Turbine', cost: 640, desc: '16 penetrating hydro needles with continuous soak.' },
    ],
    path2: [
      { name: 'High-Throw Deflector', cost: 110, desc: '+30px Expanded moisture dome range.' },
      { name: 'Chemical Retardant Feed', cost: 250, desc: 'Strips armored charcoal layers and dampens ground.' },
      { name: 'Permanent Moisture Zone', cost: 700, desc: 'Creates an impenetrable cloud that damages fires continually.' },
    ],
  },
  {
    id: 'brush-truck',
    name: 'Type 6 Brush Engine',
    cost: 480,
    role: 'Wildland Line Penetration',
    desc: 'Wildland 4x4 attack truck. Shoots high-capacity foam streams piercing entire rows of fire.',
    range: 135,
    attackInterval: 48,
    pierce: 6,
    damage: 2,
    splashRadius: 18,
    path1: [
      { name: 'PTO High-Volume Pump', cost: 190, desc: '+40% Faster stream discharge.' },
      { name: 'Bumper Turret Joystick', cost: 360, desc: 'Pierce increased to 12 fires in a straight line.' },
      { name: 'Compressed Air Foam (CAFS)', cost: 850, desc: 'Heavy micro-foam that obliterates dense wildland fires.' },
    ],
    path2: [
      { name: 'All-Terrain Clearance', cost: 150, desc: '+35px Range and faster obstacle targeting.' },
      { name: 'FLIR Thermal Camera', cost: 300, desc: 'Detects ember cores; deals +2 bonus damage to armored fires.' },
      { name: 'Strike Team Command', cost: 790, desc: 'Grants +20% attack speed to all nearby friendly towers.' },
    ],
  },
  {
    id: 'river-fireboat',
    name: 'Columbia Fireboat',
    cost: 420,
    role: 'River Water Specialist',
    desc: 'Placed in the Columbia River water zone only! High-volume suction with huge range.',
    range: 160,
    attackInterval: 34,
    pierce: 3,
    damage: 2,
    splashRadius: 20,
    isWaterOnly: true,
    path1: [
      { name: 'Twin Marine Cannons', cost: 210, desc: 'Fires two heavy water salvos in parallel.' },
      { name: 'High-Output River Impeller', cost: 390, desc: 'Shoots high-velocity water jet with 7 Pierce.' },
      { name: 'Battleship Deluge Battery', cost: 940, desc: 'Huge water artillery bombardment across river bends.' },
    ],
    path2: [
      { name: 'Crow’s Nest Lookout', cost: 130, desc: '+50px Attack range across entire coulee loop.' },
      { name: 'Riverbank Foam Barrier', cost: 280, desc: 'Coats tracks in slick foam that slows fires by 50%.' },
      { name: 'Floatplane Water Carrier', cost: 1050, desc: 'Launches miniature floatplane dropping water salvos.' },
    ],
  },
  {
    id: 'dozer-line',
    name: 'Dozer Line Scrape',
    cost: 160,
    role: 'Mineral Soil Path Trap',
    desc: 'Bulldozer fireline trench. Absorbs and extinguishes fires passing across its perimeter.',
    range: 40,
    attackInterval: 1,
    pierce: 1,
    damage: 1,
    splashRadius: 0,
    isPassiveTrap: true,
    trapMaxHits: 16,
    path1: [
      { name: 'Reinforced Berm', cost: 90, desc: '+10 Maximum hit charges before rebuilding.' },
      { name: 'Double Blade Scrape', cost: 180, desc: 'Deals 2 damage per contact.' },
      { name: 'Engineered Fuel Break', cost: 420, desc: '50 Hit charges with permanent spark barrier.' },
    ],
    path2: [
      { name: 'Wider Trench Cut', cost: 85, desc: '+15px Contact radius along the path.' },
      { name: 'Phos-Chek Dusting', cost: 190, desc: 'Strips armor from passing fires.' },
      { name: 'Fortified Coulee Trench', cost: 450, desc: 'Instantly puts out any Tier 1-3 fires on contact.' },
    ],
  },
];

// 25 Handcrafted Waves
export const WAVE_CONFIGURATIONS: Array<{
  wave: number;
  spawns: Array<{ tier: number; count: number; intervalFrames: number; delayFrames: number }>;
  rewardBonus: number;
}> = [
  {
    wave: 1,
    spawns: [{ tier: 1, count: 18, intervalFrames: 32, delayFrames: 10 }],
    rewardBonus: 105,
  },
  {
    wave: 2,
    spawns: [
      { tier: 1, count: 20, intervalFrames: 24, delayFrames: 0 },
      { tier: 2, count: 6, intervalFrames: 35, delayFrames: 200 },
    ],
    rewardBonus: 120,
  },
  {
    wave: 3,
    spawns: [
      { tier: 1, count: 15, intervalFrames: 20, delayFrames: 0 },
      { tier: 2, count: 16, intervalFrames: 28, delayFrames: 100 },
    ],
    rewardBonus: 135,
  },
  {
    wave: 4,
    spawns: [
      { tier: 2, count: 20, intervalFrames: 22, delayFrames: 0 },
      { tier: 3, count: 8, intervalFrames: 34, delayFrames: 140 },
    ],
    rewardBonus: 150,
  },
  {
    wave: 5,
    spawns: [
      { tier: 2, count: 15, intervalFrames: 18, delayFrames: 0 },
      { tier: 3, count: 18, intervalFrames: 26, delayFrames: 80 },
    ],
    rewardBonus: 165,
  },
  {
    wave: 6,
    spawns: [
      { tier: 3, count: 22, intervalFrames: 22, delayFrames: 0 },
      { tier: 4, count: 8, intervalFrames: 30, delayFrames: 160 },
    ],
    rewardBonus: 180,
  },
  {
    wave: 7,
    spawns: [
      { tier: 3, count: 25, intervalFrames: 18, delayFrames: 0 },
      { tier: 4, count: 16, intervalFrames: 24, delayFrames: 120 },
    ],
    rewardBonus: 195,
  },
  {
    wave: 8,
    spawns: [
      { tier: 4, count: 24, intervalFrames: 18, delayFrames: 0 },
      { tier: 5, count: 6, intervalFrames: 32, delayFrames: 140 },
    ],
    rewardBonus: 210,
  },
  {
    wave: 9,
    spawns: [
      { tier: 4, count: 20, intervalFrames: 16, delayFrames: 0 },
      { tier: 5, count: 14, intervalFrames: 22, delayFrames: 90 },
    ],
    rewardBonus: 230,
  },
  {
    wave: 10,
    spawns: [
      { tier: 3, count: 20, intervalFrames: 15, delayFrames: 0 },
      { tier: 6, count: 6, intervalFrames: 45, delayFrames: 100 }, // First Armored Charcoal fires!
      { tier: 4, count: 15, intervalFrames: 18, delayFrames: 250 },
    ],
    rewardBonus: 260,
  },
  {
    wave: 11,
    spawns: [
      { tier: 5, count: 22, intervalFrames: 16, delayFrames: 0 },
      { tier: 6, count: 8, intervalFrames: 35, delayFrames: 120 },
    ],
    rewardBonus: 280,
  },
  {
    wave: 12,
    spawns: [
      { tier: 4, count: 30, intervalFrames: 12, delayFrames: 0 },
      { tier: 6, count: 12, intervalFrames: 30, delayFrames: 150 },
      { tier: 5, count: 18, intervalFrames: 16, delayFrames: 300 },
    ],
    rewardBonus: 310,
  },
  {
    wave: 13,
    spawns: [
      { tier: 5, count: 28, intervalFrames: 14, delayFrames: 0 },
      { tier: 6, count: 16, intervalFrames: 25, delayFrames: 100 },
    ],
    rewardBonus: 340,
  },
  {
    wave: 14,
    spawns: [
      { tier: 6, count: 22, intervalFrames: 22, delayFrames: 0 },
      { tier: 7, count: 4, intervalFrames: 50, delayFrames: 180 }, // First Canyon Firestorms!
    ],
    rewardBonus: 380,
  },
  {
    wave: 15,
    spawns: [
      { tier: 5, count: 35, intervalFrames: 10, delayFrames: 0 }, // Fast timber rush!
      { tier: 7, count: 8, intervalFrames: 40, delayFrames: 150 },
    ],
    rewardBonus: 420,
  },
  {
    wave: 16,
    spawns: [
      { tier: 6, count: 25, intervalFrames: 18, delayFrames: 0 },
      { tier: 7, count: 12, intervalFrames: 32, delayFrames: 120 },
    ],
    rewardBonus: 460,
  },
  {
    wave: 17,
    spawns: [
      { tier: 5, count: 40, intervalFrames: 10, delayFrames: 0 },
      { tier: 7, count: 16, intervalFrames: 28, delayFrames: 140 },
    ],
    rewardBonus: 500,
  },
  {
    wave: 18,
    spawns: [
      { tier: 6, count: 30, intervalFrames: 16, delayFrames: 0 },
      { tier: 7, count: 20, intervalFrames: 24, delayFrames: 100 },
    ],
    rewardBonus: 550,
  },
  {
    wave: 19,
    spawns: [
      { tier: 5, count: 50, intervalFrames: 8, delayFrames: 0 },
      { tier: 6, count: 30, intervalFrames: 14, delayFrames: 150 },
      { tier: 7, count: 24, intervalFrames: 20, delayFrames: 300 },
    ],
    rewardBonus: 600,
  },
  {
    wave: 20,
    spawns: [
      { tier: 7, count: 30, intervalFrames: 18, delayFrames: 0 },
      { tier: 8, count: 1, intervalFrames: 1, delayFrames: 300 }, // THE BADGER MOUNTAIN TIMBER INFERNO!
      { tier: 6, count: 20, intervalFrames: 16, delayFrames: 450 },
    ],
    rewardBonus: 800,
  },
];

// Check if placement coordinates are valid
export const checkPlacementValidity = (
  x: number,
  y: number,
  towerConfig: TowerTypeConfig,
  placedTowers: PlacedTower[]
): { valid: boolean; reason?: string } => {
  // 1. Boundary check (canvas 840x540, keep 25px margin)
  if (x < 25 || x > 815 || y < 25 || y > 515) {
    return { valid: false, reason: 'Outside boundary' };
  }

  // 2. Columbia River Zone Check
  // River runs through x ~ 330 to 420 from top to bottom
  const isInRiver = x >= 330 && x <= 420;

  if (towerConfig.isWaterOnly) {
    if (!isInRiver) {
      return { valid: false, reason: 'Must place Fireboat in Columbia River water!' };
    }
  } else if (!towerConfig.isPassiveTrap) {
    if (isInRiver) {
      return { valid: false, reason: 'Land units cannot be placed in the river!' };
    }
  }

  // 3. Track Collision Check
  // Test distance to all track segments
  const pathHalfWidth = 26; // 38px path + margin
  for (let i = 0; i < TRACK_WAYPOINTS.length - 1; i++) {
    const p1 = TRACK_WAYPOINTS[i];
    const p2 = TRACK_WAYPOINTS[i + 1];

    // Distance from point to line segment
    const l2 = (p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2;
    let t = ((x - p1.x) * (p2.x - p1.x) + (y - p1.y) * (p2.y - p1.y)) / l2;
    t = Math.max(0, Math.min(1, t));
    const projX = p1.x + t * (p2.x - p1.x);
    const projY = p1.y + t * (p2.y - p1.y);
    const dist = Math.hypot(x - projX, y - projY);

    if (towerConfig.isPassiveTrap) {
      // Dozer line CAN be placed right on or near the track
      if (dist > 45) {
        return { valid: false, reason: 'Must place Dozer line on or near the path!' };
      }
    } else {
      if (dist < pathHalfWidth + 16) {
        return { valid: false, reason: 'Cannot place on the track pathway!' };
      }
    }
  }

  // 4. Overlap with existing towers
  for (const t of placedTowers) {
    const dist = Math.hypot(x - t.x, y - t.y);
    if (dist < 34) {
      return { valid: false, reason: 'Too close to another unit!' };
    }
  }

  return { valid: true };
};

// ============================================================================
// MAIN COMPONENT: FIRE GAME PAGE (BTD 5 ARCHITECTURE)
// ============================================================================

export const FireGamePage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Core Game State
  const [lives, setLives] = useState<number>(100);
  const [cash, setCash] = useState<number>(650);
  const [round, setRound] = useState<number>(1);
  const [totalRounds] = useState<number>(20);
  const [gameState, setGameState] = useState<'placement' | 'wave_active' | 'victory' | 'game_over'>('placement');
  const [gameSpeed, setGameSpeed] = useState<1 | 2>(1);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    return parseInt(localStorage.getItem('dcfd4_btd_high_score') || '0', 10);
  });

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      try {
        localStorage.setItem('dcfd4_btd_high_score', String(score));
      } catch (_) {}
    }
  }, [score, highScore]);

  // Selection & Inspector State
  const [selectedShopTowerId, setSelectedShopTowerId] = useState<string | null>(null);
  const [selectedPlacedTowerId, setSelectedPlacedTowerId] = useState<string | null>(null);
  const [hoverCoords, setHoverCoords] = useState<{ x: number; y: number } | null>(null);

  // Mutable refs for zero-latency game loop rendering
  const hoverCoordsRef = useRef<{ x: number; y: number } | null>(null);
  const selectedShopConfigRef = useRef<TowerTypeConfig | null>(null);
  const selectedPlacedTowerIdRef = useRef<string | null>(null);
  const isPlacingAirDropRef = useRef<boolean>(false);

  // Power-Ups State
  const [airDropsAvailable, setAirDropsAvailable] = useState<number>(1);
  const [isPlacingAirDrop, setIsPlacingAirDrop] = useState<boolean>(false);
  const [isPumpBoostActive, setIsPumpBoostActive] = useState<boolean>(false);
  const [pumpBoostCooldown, setPumpBoostCooldown] = useState<number>(0);

  // Web Audio Context
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Mutable Game Loop State Reference for high performance (60 FPS)
  const gameRef = useRef<{
    lives: number;
    cash: number;
    round: number;
    score: number;
    gameState: 'placement' | 'wave_active' | 'victory' | 'game_over';
    speedMultiplier: number;
    placedTowers: PlacedTower[];
    activeFires: ActiveFire[];
    projectiles: WaterProjectile[];
    retardants: RetardantLine[];
    airTanker: AirTankerStrike | null;
    particles: ParticleEffect[];
    spawnQueue: Array<{ tier: number; spawnFrame: number }>;
    currentWaveFrame: number;
    waveRewardBonus: number;
    pumpBoostTimer: number;
    nextFireId: number;
    nextTowerId: number;
    nextProjId: number;
  }>({
    lives: 100,
    cash: 650,
    round: 1,
    score: 0,
    gameState: 'placement',
    speedMultiplier: 1,
    placedTowers: [],
    activeFires: [],
    projectiles: [],
    retardants: [],
    airTanker: null,
    particles: [],
    spawnQueue: [],
    currentWaveFrame: 0,
    waveRewardBonus: 100,
    pumpBoostTimer: 0,
    nextFireId: 1,
    nextTowerId: 1,
    nextProjId: 1,
  });

  const lastPopSoundTimeRef = useRef<number>(0);
  const lastWaterShotTimeRef = useRef<number>(0);

  // Sound Synthesizers via Native Web Audio API
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
  };

  const playPopSound = () => {
    if (!isAudioEnabled || !audioCtxRef.current) return;
    const now = performance.now();
    if (now - lastPopSoundTimeRef.current < 40) return;
    lastPopSoundTimeRef.current = now;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450 + Math.random() * 200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (_) {}
  };

  const playWaterShotSound = () => {
    if (!isAudioEnabled || !audioCtxRef.current) return;
    const now = performance.now();
    if (now - lastWaterShotTimeRef.current < 40) return;
    lastWaterShotTimeRef.current = now;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260 + Math.random() * 60, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (_) {}
  };

  const playBuildSound = () => {
    if (!isAudioEnabled || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.setValueAtTime(480, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (_) {}
  };

  const playAirDropSound = () => {
    if (!isAudioEnabled || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(140, ctx.currentTime + 0.7);
      osc.frequency.linearRampToValueAtTime(60, ctx.currentTime + 2.0);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.7);
      gain.gain.linearRampToValueAtTime(0.005, ctx.currentTime + 2.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 2.3);
    } catch (_) {}
  };

  const playWaveWonSound = () => {
    if (!isAudioEnabled || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      [440, 554, 659, 880].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
        gain.gain.setValueAtTime(0.1, ctx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.07);
        osc.stop(ctx.currentTime + idx * 0.07 + 0.3);
      });
    } catch (_) {}
  };

  // Find currently selected placed tower object
  const selectedPlacedTower = useMemo(() => {
    if (!selectedPlacedTowerId) return null;
    return gameRef.current.placedTowers.find(t => t.id === selectedPlacedTowerId) || null;
  }, [selectedPlacedTowerId, cash, round]);

  // Find currently selected shop config
  const selectedShopConfig = useMemo(() => {
    if (!selectedShopTowerId) return null;
    return TOWER_CONFIGS.find(t => t.id === selectedShopTowerId) || null;
  }, [selectedShopTowerId]);

  useEffect(() => {
    hoverCoordsRef.current = hoverCoords;
  }, [hoverCoords]);

  useEffect(() => {
    selectedShopConfigRef.current = selectedShopConfig;
  }, [selectedShopConfig]);

  useEffect(() => {
    selectedPlacedTowerIdRef.current = selectedPlacedTowerId;
  }, [selectedPlacedTowerId]);

  useEffect(() => {
    isPlacingAirDropRef.current = isPlacingAirDrop;
  }, [isPlacingAirDrop]);

  // Restart / Reset Game
  const restartGame = () => {
    initAudio();
    gameRef.current = {
      lives: 100,
      cash: 650,
      round: 1,
      score: 0,
      gameState: 'placement',
      speedMultiplier: 1,
      placedTowers: [],
      activeFires: [],
      projectiles: [],
      retardants: [],
      airTanker: null,
      particles: [],
      spawnQueue: [],
      currentWaveFrame: 0,
      waveRewardBonus: 100,
      pumpBoostTimer: 0,
      nextFireId: 1,
      nextTowerId: 1,
      nextProjId: 1,
    };

    setLives(100);
    setCash(650);
    setRound(1);
    setScore(0);
    setGameState('placement');
    setGameSpeed(1);
    setSelectedShopTowerId(null);
    setSelectedPlacedTowerId(null);
    setHoverCoords(null);
    setAirDropsAvailable(1);
    setIsPlacingAirDrop(false);
    setIsPumpBoostActive(false);
  };

  // Start Next Wave
  const startWave = () => {
    initAudio();
    if (gameState !== 'placement') return;

    const currentWaveIndex = gameRef.current.round - 1;
    const waveConfig = WAVE_CONFIGURATIONS[currentWaveIndex] || WAVE_CONFIGURATIONS[WAVE_CONFIGURATIONS.length - 1];

    // Build spawn timeline
    const queue: Array<{ tier: number; spawnFrame: number }> = [];
    for (const group of waveConfig.spawns) {
      for (let i = 0; i < group.count; i++) {
        queue.push({
          tier: group.tier,
          spawnFrame: group.delayFrames + i * group.intervalFrames,
        });
      }
    }

    // Sort queue by spawn frame
    queue.sort((a, b) => a.spawnFrame - b.spawnFrame);

    gameRef.current.spawnQueue = queue;
    gameRef.current.currentWaveFrame = 0;
    gameRef.current.waveRewardBonus = waveConfig.rewardBonus;
    gameRef.current.gameState = 'wave_active';
    setGameState('wave_active');
    playBuildSound();
  };

  // Toggle 1x / 2x Speed
  const toggleSpeed = () => {
    const nextSpeed = gameSpeed === 1 ? 2 : 1;
    setGameSpeed(nextSpeed);
    gameRef.current.speedMultiplier = nextSpeed;
  };

  // Select Tower from Shop
  const handleSelectShopTower = (towerId: string) => {
    initAudio();
    setSelectedPlacedTowerId(null);
    setIsPlacingAirDrop(false);
    if (selectedShopTowerId === towerId) {
      setSelectedShopTowerId(null);
    } else {
      setSelectedShopTowerId(towerId);
    }
  };

  // Select Air Drop Power-Up
  const handleSelectAirDrop = () => {
    initAudio();
    if (airDropsAvailable <= 0) return;
    setSelectedShopTowerId(null);
    setSelectedPlacedTowerId(null);
    setIsPlacingAirDrop(true);
  };

  // Activate RiverCom Pump Boost
  const handleActivatePumpBoost = () => {
    initAudio();
    if (pumpBoostCooldown > 0 || isPumpBoostActive) return;
    if (cash < 150) return;

    setCash(prev => prev - 150);
    gameRef.current.cash -= 150;
    gameRef.current.pumpBoostTimer = 480; // 8 seconds @ 60fps
    setIsPumpBoostActive(true);
    setPumpBoostCooldown(25); // 25 seconds cooldown
    playAirDropSound();
  };

  // Purchase Upgrade for Selected Tower
  const handlePurchaseUpgrade = (path: 1 | 2) => {
    if (!selectedPlacedTower) return;
    const config = TOWER_CONFIGS.find(c => c.id === selectedPlacedTower.typeId);
    if (!config) return;

    const currentTier = path === 1 ? selectedPlacedTower.path1Tier : selectedPlacedTower.path2Tier;
    if (currentTier >= 3) return;

    const upgradeList = path === 1 ? config.path1 : config.path2;
    const upgrade = upgradeList[currentTier];
    if (!upgrade) return;

    if (cash < upgrade.cost) return;

    // Deduct cash
    const newCash = cash - upgrade.cost;
    setCash(newCash);
    gameRef.current.cash = newCash;

    // Apply upgrade effects
    selectedPlacedTower.investedCost += upgrade.cost;
    if (path === 1) {
      selectedPlacedTower.path1Tier++;
      if (selectedPlacedTower.path1Tier === 1) {
        selectedPlacedTower.attackInterval = Math.round(selectedPlacedTower.attackInterval * 0.75);
      } else if (selectedPlacedTower.path1Tier === 2) {
        selectedPlacedTower.damage += 1;
        selectedPlacedTower.pierce += 1;
      } else if (selectedPlacedTower.path1Tier === 3) {
        selectedPlacedTower.damage += 2;
        selectedPlacedTower.pierce += 3;
        selectedPlacedTower.splashRadius += 20;
      }
    } else {
      selectedPlacedTower.path2Tier++;
      if (selectedPlacedTower.path2Tier === 1) {
        selectedPlacedTower.range += 35;
      } else if (selectedPlacedTower.path2Tier === 2) {
        selectedPlacedTower.range += 25;
        selectedPlacedTower.pierce += 2;
      } else if (selectedPlacedTower.path2Tier === 3) {
        selectedPlacedTower.range += 45;
        selectedPlacedTower.attackInterval = Math.round(selectedPlacedTower.attackInterval * 0.8);
      }
    }

    playBuildSound();
  };

  // Change Target Priority
  const handleChangePriority = (priority: TargetPriority) => {
    if (!selectedPlacedTower) return;
    selectedPlacedTower.targeting = priority;
    setScore(s => s + 0); // Trigger react re-render
  };

  // Sell Selected Tower (70% refund)
  const handleSellTower = () => {
    if (!selectedPlacedTower) return;
    const refund = Math.round(selectedPlacedTower.investedCost * 0.7);
    const newCash = cash + refund;
    setCash(newCash);
    gameRef.current.cash = newCash;

    gameRef.current.placedTowers = gameRef.current.placedTowers.filter(t => t.id !== selectedPlacedTower.id);
    setSelectedPlacedTowerId(null);
    playBuildSound();
  };

  // Canvas Coordinate Helper
  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  // Canvas Click Handler: Place Tower, Drop Retardant, or Select Tower
  const handleCanvasClick = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoords(e);

    // 1. Air Drop Deployment
    if (isPlacingAirDrop && airDropsAvailable > 0) {
      setAirDropsAvailable(prev => prev - 1);
      setIsPlacingAirDrop(false);

      // Launch Air Tanker across screen
      gameRef.current.airTanker = {
        active: true,
        x: -120,
        y: coords.y - 40,
        targetX: coords.x,
        targetY: coords.y,
        speed: 24,
        dropped: false,
      };

      playAirDropSound();
      return;
    }

    // 2. Buy and Place Selected Tower from Shop
    if (selectedShopConfig) {
      if (cash < selectedShopConfig.cost) return;

      const validity = checkPlacementValidity(coords.x, coords.y, selectedShopConfig, gameRef.current.placedTowers);
      if (!validity.valid) return;

      // Deduct Cost
      const newCash = cash - selectedShopConfig.cost;
      setCash(newCash);
      gameRef.current.cash = newCash;

      // Create new Tower
      const newTower: PlacedTower = {
        id: `tower-${gameRef.current.nextTowerId++}`,
        typeId: selectedShopConfig.id,
        x: coords.x,
        y: coords.y,
        angle: 0,
        range: selectedShopConfig.range,
        attackInterval: selectedShopConfig.attackInterval,
        cooldownTimer: 0,
        pierce: selectedShopConfig.pierce,
        damage: selectedShopConfig.damage,
        splashRadius: selectedShopConfig.splashRadius,
        targeting: 'first',
        kills: 0,
        investedCost: selectedShopConfig.cost,
        path1Tier: 0,
        path2Tier: 0,
        isWaterOnly: selectedShopConfig.isWaterOnly,
        isPassiveTrap: selectedShopConfig.isPassiveTrap,
        trapHitsLeft: selectedShopConfig.trapMaxHits,
      };

      gameRef.current.placedTowers.push(newTower);
      setSelectedShopTowerId(null);
      setSelectedPlacedTowerId(newTower.id);
      playBuildSound();
      return;
    }

    // 3. Inspect existing placed tower
    for (const t of gameRef.current.placedTowers) {
      const dist = Math.hypot(coords.x - t.x, coords.y - t.y);
      if (dist <= 26) {
        setSelectedPlacedTowerId(t.id);
        setSelectedShopTowerId(null);
        playPopSound();
        return;
      }
    }

    // Clicked empty ground: deselect
    setSelectedPlacedTowerId(null);
    setSelectedShopTowerId(null);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoords(e);
    hoverCoordsRef.current = coords;
    setHoverCoords(coords);
  };

  const handlePointerLeave = () => {
    hoverCoordsRef.current = null;
    setHoverCoords(null);
  };

  // Cooldown timer interval for abilities
  useEffect(() => {
    if (pumpBoostCooldown > 0) {
      const timer = setInterval(() => {
        setPumpBoostCooldown(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [pumpBoostCooldown]);

  // Main 60 FPS Game Engine Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const gameLoop = () => {
      const g = gameRef.current;
      const speed = g.speedMultiplier;
      const prevCash = g.cash;
      const prevScore = g.score;
      const prevLives = g.lives;
      const prevRound = g.round;
      const prevGameState = g.gameState;

      for (let step = 0; step < speed; step++) {
        // --------------------------------------------------------------------
        // 1. UPDATE ABILITIES & TIMERS
        // --------------------------------------------------------------------
        if (g.pumpBoostTimer > 0) {
          g.pumpBoostTimer--;
          if (g.pumpBoostTimer <= 0) {
            setIsPumpBoostActive(false);
          }
        }

        // --------------------------------------------------------------------
        // 2. SPAWN FIRES FROM QUEUE
        // --------------------------------------------------------------------
        if (g.gameState === 'wave_active') {
          g.currentWaveFrame++;

          while (g.spawnQueue.length > 0 && g.currentWaveFrame >= g.spawnQueue[0].spawnFrame) {
            const spawnItem = g.spawnQueue.shift()!;
            const tierDef = FIRE_TIERS[spawnItem.tier] || FIRE_TIERS[1];

            const newFire: ActiveFire = {
              id: `fire-${g.nextFireId++}`,
              tier: tierDef.tier,
              hp: tierDef.hp,
              maxHp: tierDef.hp,
              speed: tierDef.speed,
              reward: tierDef.reward,
              distanceTraveled: 0,
              x: TRACK_WAYPOINTS[0].x,
              y: TRACK_WAYPOINTS[0].y,
              radius: tierDef.radius,
              color: tierDef.color,
              coreColor: tierDef.coreColor,
              isArmored: !!tierDef.isArmored,
              isBoss: !!tierDef.isBoss,
              slowTimer: 0,
            };

            g.activeFires.push(newFire);
          }
        }

        // --------------------------------------------------------------------
        // 3. UPDATE ACTIVE FIRES (MOVE ALONG SERPENTINE TRACK)
        // --------------------------------------------------------------------
        for (let i = g.activeFires.length - 1; i >= 0; i--) {
          const fire = g.activeFires[i];

          // Apply slow effects if soaked
          let currentSpeed = fire.speed;
          if (fire.slowTimer > 0) {
            fire.slowTimer--;
            currentSpeed *= 0.6; // 40% slow
          }

          fire.distanceTraveled += currentSpeed;

          // Check if fire reached the end of the track (breached town!)
          if (fire.distanceTraveled >= TOTAL_TRACK_LENGTH) {
            g.activeFires.splice(i, 1);
            const damageToLives = fire.isBoss ? 40 : fire.tier;
            g.lives = Math.max(0, g.lives - damageToLives);

            // Breach smoke effect at Station 241
            for (let p = 0; p < 8; p++) {
              g.particles.push({
                x: 750 + (Math.random() - 0.5) * 30,
                y: 530 + (Math.random() - 0.5) * 20,
                vx: (Math.random() - 0.5) * 3,
                vy: -Math.random() * 3,
                radius: 12 + Math.random() * 8,
                alpha: 0.9,
                color: '#475569',
                life: 0,
                maxLife: 35,
              });
            }

            if (g.lives <= 0) {
              g.gameState = 'game_over';
              break;
            }
            continue;
          }

          // Interpolate coordinates along track
          const pos = getCoordinateAtDistance(fire.distanceTraveled);
          fire.x = pos.x;
          fire.y = pos.y;
        }

        // --------------------------------------------------------------------
        // 4. UPDATE RETARDANT CHEMICAL LINES & AIR TANKER
        // --------------------------------------------------------------------
        for (let r = g.retardants.length - 1; r >= 0; r--) {
          const ret = g.retardants[r];
          ret.timeLeft -= 1 / 60;
          if (ret.timeLeft <= 0) {
            g.retardants.splice(r, 1);
            continue;
          }

          // Retardant quenches any fires touching it!
          for (let fIdx = g.activeFires.length - 1; fIdx >= 0; fIdx--) {
            const fire = g.activeFires[fIdx];
            if (
              Math.abs(fire.x - ret.x) < ret.width / 2 + fire.radius &&
              Math.abs(fire.y - ret.y) < ret.height / 2 + fire.radius
            ) {
              fire.hp -= 4;
              fire.slowTimer = 90;
              if (fire.hp <= 0) {
                // Pop Fire
                g.activeFires.splice(fIdx, 1);
                g.cash += fire.tier;
                g.score += fire.tier * 15;
              }
            }
          }
        }

        // Air Tanker Flight
        if (g.airTanker && g.airTanker.active) {
          const plane = g.airTanker;
          plane.x += plane.speed;

          // Drop when reaching target X
          if (!plane.dropped && plane.x >= plane.targetX - 50) {
            plane.dropped = true;
            // Create Retardant Chemical Line
            g.retardants.push({
              id: `ret-${Date.now()}`,
              x: plane.targetX,
              y: plane.targetY,
              width: 140,
              height: 60,
              timeLeft: 16, // 16 seconds
            });

            // Retardant dust particles
            for (let p = 0; p < 25; p++) {
              g.particles.push({
                x: plane.targetX + (Math.random() - 0.5) * 120,
                y: plane.targetY + (Math.random() - 0.5) * 45,
                vx: (Math.random() - 0.5) * 2,
                vy: Math.random() * 1.5,
                radius: 14 + Math.random() * 10,
                alpha: 0.85,
                color: '#dc2626',
                life: 0,
                maxLife: 40,
              });
            }
          }

          if (plane.x > canvas.width + 120) {
            g.airTanker = null;
          }
        }

        // --------------------------------------------------------------------
        // 5. UPDATE TOWERS & WEAPONS TARGETING
        // --------------------------------------------------------------------
        const pumpSpeedMultiplier = g.pumpBoostTimer > 0 ? 2 : 1;

        for (const tower of g.placedTowers) {
          // Passive trap handling (Dozer lines)
          if (tower.isPassiveTrap) {
            for (let fIdx = g.activeFires.length - 1; fIdx >= 0; fIdx--) {
              const fire = g.activeFires[fIdx];
              const dist = Math.hypot(fire.x - tower.x, fire.y - tower.y);
              if (dist <= tower.range + fire.radius) {
                fire.hp -= tower.damage;
                if (tower.trapHitsLeft !== undefined) {
                  tower.trapHitsLeft--;
                  if (tower.trapHitsLeft <= 0) {
                    g.placedTowers = g.placedTowers.filter(t => t.id !== tower.id);
                  }
                }

                if (fire.hp <= 0) {
                  g.activeFires.splice(fIdx, 1);
                  g.cash += fire.tier;
                  g.score += fire.tier * 10;
                  playPopSound();
                }
                break;
              }
            }
            continue;
          }

          // Active Towers: Cooldown countdown
          if (tower.cooldownTimer > 0) {
            tower.cooldownTimer -= pumpSpeedMultiplier;
            continue;
          }

          // Find targets within range
          const inRangeFires = g.activeFires.filter(f => {
            const dist = Math.hypot(f.x - tower.x, f.y - tower.y);
            return dist <= tower.range + f.radius;
          });

          if (inRangeFires.length === 0) continue;

          // Target Selection based on chosen AI
          let target: ActiveFire = inRangeFires[0];
          if (tower.targeting === 'first') {
            target = inRangeFires.reduce((prev, curr) => (curr.distanceTraveled > prev.distanceTraveled ? curr : prev));
          } else if (tower.targeting === 'last') {
            target = inRangeFires.reduce((prev, curr) => (curr.distanceTraveled < prev.distanceTraveled ? curr : prev));
          } else if (tower.targeting === 'strongest') {
            target = inRangeFires.reduce((prev, curr) => (curr.hp > prev.hp ? curr : prev));
          } else if (tower.targeting === 'close') {
            target = inRangeFires.reduce((prev, curr) => {
              const d1 = Math.hypot(curr.x - tower.x, curr.y - tower.y);
              const d2 = Math.hypot(prev.x - tower.x, prev.y - tower.y);
              return d1 < d2 ? curr : prev;
            });
          }

          // Rotate tower nozzle toward target
          tower.angle = Math.atan2(target.y - tower.y, target.x - tower.x);
          tower.cooldownTimer = tower.attackInterval;

          // Fire Projectile(s)
          playWaterShotSound();

          if (tower.typeId === 'perimeter-sprinkler') {
            // Shoots 8 or 12 or 16 radial mist jets in all directions
            const nozzleCount = tower.path1Tier >= 3 ? 16 : tower.path1Tier >= 1 ? 12 : 8;
            for (let n = 0; n < nozzleCount; n++) {
              const rad = (n / nozzleCount) * Math.PI * 2;
              g.projectiles.push({
                id: `proj-${g.nextProjId++}`,
                x: tower.x,
                y: tower.y,
                vx: Math.cos(rad) * 6.5,
                vy: Math.sin(rad) * 6.5,
                speed: 6.5,
                radius: 4,
                pierceLeft: tower.pierce,
                damage: tower.damage,
                distanceTraveled: 0,
                maxDistance: tower.range,
                splashRadius: 0,
                isSprinklerMist: true,
                hitFireIds: new Set(),
              });
            }
          } else {
            // Standard or Multi-Stream Shoot
            const shotCount = (tower.typeId === 'hose-volunteer' && tower.path1Tier >= 2) ||
                              (tower.typeId === 'deck-gun' && tower.path2Tier >= 3) ||
                              (tower.typeId === 'river-fireboat' && tower.path1Tier >= 1) ? 2 : 1;

            for (let s = 0; s < shotCount; s++) {
              const spread = (s - (shotCount - 1) / 2) * 0.18;
              const angle = tower.angle + spread;
              const isFoam = tower.path2Tier >= 2 || tower.typeId === 'brush-truck';

              g.projectiles.push({
                id: `proj-${g.nextProjId++}`,
                x: tower.x + Math.cos(angle) * 16,
                y: tower.y + Math.sin(angle) * 16,
                vx: Math.cos(angle) * 8.5,
                vy: Math.sin(angle) * 8.5,
                speed: 8.5,
                radius: isFoam ? 6 : 5,
                pierceLeft: tower.pierce,
                damage: tower.damage,
                distanceTraveled: 0,
                maxDistance: tower.range + 20,
                splashRadius: tower.splashRadius,
                isFoam,
                hitFireIds: new Set(),
              });
            }
          }
        }

        // --------------------------------------------------------------------
        // 6. UPDATE WATER PROJECTILES & COLLISION DETECTION
        // --------------------------------------------------------------------
        for (let pIdx = g.projectiles.length - 1; pIdx >= 0; pIdx--) {
          const proj = g.projectiles[pIdx];
          proj.x += proj.vx;
          proj.y += proj.vy;
          proj.distanceTraveled += proj.speed;

          if (proj.distanceTraveled >= proj.maxDistance) {
            g.projectiles.splice(pIdx, 1);
            continue;
          }

          // Check collisions against active fires
          for (let fIdx = g.activeFires.length - 1; fIdx >= 0; fIdx--) {
            const fire = g.activeFires[fIdx];
            if (proj.hitFireIds.has(fire.id)) continue;

            const dist = Math.hypot(proj.x - fire.x, proj.y - fire.y);
            if (dist <= fire.radius + proj.radius) {
              // Mark as hit
              proj.hitFireIds.add(fire.id);
              proj.pierceLeft--;

              // Armored check: if armored and not heavy water/foam, deals half damage
              const effectiveDamage = fire.isArmored && !proj.isFoam && proj.splashRadius === 0 ? 1 : proj.damage;
              fire.hp -= effectiveDamage;

              if (proj.isFoam) {
                fire.slowTimer = 90; // Apply slow
              }

              // Splash Area-of-Effect Damage (Deck Gun / Cannon)
              if (proj.splashRadius > 0) {
                for (const otherFire of g.activeFires) {
                  if (otherFire.id !== fire.id) {
                    const splashDist = Math.hypot(proj.x - otherFire.x, proj.y - otherFire.y);
                    if (splashDist <= proj.splashRadius + otherFire.radius) {
                      otherFire.hp -= Math.ceil(proj.damage * 0.7);
                    }
                  }
                }
              }

              // Steam / Water Pop Particles
              for (let s = 0; s < 4; s++) {
                g.particles.push({
                  x: fire.x + (Math.random() - 0.5) * 10,
                  y: fire.y + (Math.random() - 0.5) * 10,
                  vx: (Math.random() - 0.5) * 2,
                  vy: -Math.random() * 2 - 0.5,
                  radius: 3 + Math.random() * 3,
                  alpha: 0.8,
                  color: '#e2e8f0', // steam white
                  life: 0,
                  maxLife: 20,
                });
              }

              playPopSound();

              // POP OR SPLIT FIRE WHEN HP DROPS
              if (fire.hp <= 0) {
                g.activeFires.splice(fIdx, 1);
                g.cash += fire.reward;
                g.score += fire.tier * 10;

                // Spawn children fires if higher tier (Bloons splitting mechanism!)
                if (fire.tier > 1) {
                  const childTier = fire.tier - 1;
                  const childDef = FIRE_TIERS[childTier] || FIRE_TIERS[1];
                  const childCount = fire.tier === 7 || fire.tier === 6 ? 2 : fire.isBoss ? 4 : 1;

                  for (let c = 0; c < childCount; c++) {
                    const offset = (c - (childCount - 1) / 2) * 10;
                    g.activeFires.push({
                      id: `fire-${g.nextFireId++}`,
                      tier: childDef.tier,
                      hp: childDef.hp,
                      maxHp: childDef.hp,
                      speed: childDef.speed,
                      reward: childDef.reward,
                      distanceTraveled: Math.max(0, fire.distanceTraveled + offset),
                      x: fire.x,
                      y: fire.y,
                      radius: childDef.radius,
                      color: childDef.color,
                      coreColor: childDef.coreColor,
                      isArmored: !!childDef.isArmored,
                      isBoss: false,
                      slowTimer: 0,
                    });
                  }
                }
              }

              // Destroy projectile if out of pierce
              if (proj.pierceLeft <= 0) {
                g.projectiles.splice(pIdx, 1);
                break;
              }
            }
          }
        }

        // --------------------------------------------------------------------
        // 7. UPDATE STEAM & MIST PARTICLES
        // --------------------------------------------------------------------
        for (let ptIdx = g.particles.length - 1; ptIdx >= 0; ptIdx--) {
          const pt = g.particles[ptIdx];
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.life++;
          pt.alpha = 1 - pt.life / pt.maxLife;
          if (pt.life >= pt.maxLife) {
            g.particles.splice(ptIdx, 1);
          }
        }

        // --------------------------------------------------------------------
        // 8. CHECK WAVE COMPLETION OR VICTORY
        // --------------------------------------------------------------------
        if (g.gameState === 'wave_active') {
          if (g.currentWaveFrame > 30 && g.spawnQueue.length === 0 && g.activeFires.length === 0) {
            // Wave Cleared!
            g.cash += g.waveRewardBonus;
            playWaveWonSound();

            if (g.round >= totalRounds) {
              // Game Won!
              g.gameState = 'victory';
            } else {
              g.round++;
              g.gameState = 'placement';

              // Earn Air Drop every 5 rounds
              if (g.round % 5 === 0) {
                setAirDropsAvailable(prev => prev + 1);
              }
            }
          }
        }
      } // End Step Multiplier loop

      // Sync frame changes to React state at most once per frame
      if (g.cash !== prevCash) setCash(g.cash);
      if (g.score !== prevScore) setScore(g.score);
      if (g.lives !== prevLives) setLives(g.lives);
      if (g.round !== prevRound) setRound(g.round);
      if (g.gameState !== prevGameState) setGameState(g.gameState);

      // ----------------------------------------------------------------------
      // 9. RENDER CANVAS (840 x 540 BLOONS TD 5 STYLE GRAPHICS)
      // ----------------------------------------------------------------------
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grassland terrain base
      ctx.fillStyle = '#4ade80'; // Lush orchard grass
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle grass texture patches
      ctx.fillStyle = '#22c55e';
      for (let tx = 30; tx < canvas.width; tx += 65) {
        for (let ty = 30; ty < canvas.height; ty += 65) {
          ctx.beginPath();
          ctx.arc(tx + ((ty % 2) * 20), ty, 12, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Columbia River Water Zone (x = 330 to 420)
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.moveTo(330, 0);
      ctx.bezierCurveTo(310, 180, 360, 340, 340, 540);
      ctx.lineTo(430, 540);
      ctx.bezierCurveTo(450, 340, 400, 180, 420, 0);
      ctx.closePath();
      ctx.fill();

      // Shimmering river waves
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 2;
      for (let w = 0; w < 6; w++) {
        const wy = (w * 90 + (Date.now() * 0.05) % 90);
        ctx.beginPath();
        ctx.moveTo(345, wy);
        ctx.quadraticCurveTo(375, wy - 10, 405, wy);
        ctx.stroke();
      }

      // Riverbanks
      ctx.strokeStyle = '#d97706'; // Sandy brown bank
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(330, 0);
      ctx.bezierCurveTo(310, 180, 360, 340, 340, 540);
      ctx.moveTo(420, 0);
      ctx.bezierCurveTo(400, 180, 450, 340, 430, 540);
      ctx.stroke();

      // DRAW THE SERPENTINE TRACK (Cobblestone / Sandy Soil Pathway)
      // Path Border
      ctx.strokeStyle = '#78350f'; // Dark earth border
      ctx.lineWidth = 42;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(TRACK_WAYPOINTS[0].x, TRACK_WAYPOINTS[0].y);
      for (let i = 1; i < TRACK_WAYPOINTS.length; i++) {
        ctx.lineTo(TRACK_WAYPOINTS[i].x, TRACK_WAYPOINTS[i].y);
      }
      ctx.stroke();

      // Path Core (Cobblestone pathway)
      ctx.strokeStyle = '#e2e8f0'; // Clean grey-tan road stones
      ctx.lineWidth = 36;
      ctx.stroke();

      // Cobblestone dashes
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 30;
      ctx.setLineDash([12, 10]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Wooden Bridge across Columbia River (x = 320 to 440, y = 440)
      ctx.fillStyle = '#78350f';
      ctx.fillRect(325, 415, 110, 50);
      ctx.fillStyle = '#b45309';
      for (let bx = 330; bx < 430; bx += 10) {
        ctx.fillRect(bx, 417, 8, 46);
      }
      // Bridge rails
      ctx.fillStyle = '#451a03';
      ctx.fillRect(325, 413, 110, 4);
      ctx.fillRect(325, 463, 110, 4);

      // Scenery: Apple Orchard Trees around borders
      const treeCoords = [
        { x: 60, y: 50 }, { x: 130, y: 40 }, { x: 500, y: 70 }, { x: 560, y: 60 },
        { x: 160, y: 350 }, { x: 260, y: 490 }, { x: 530, y: 470 }, { x: 700, y: 80 },
        { x: 800, y: 220 }, { x: 790, y: 140 }, { x: 540, y: 250 }
      ];
      for (const tc of treeCoords) {
        // Tree trunk shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.ellipse(tc.x + 3, tc.y + 12, 14, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Tree foliage
        ctx.fillStyle = '#15803d';
        ctx.beginPath();
        ctx.arc(tc.x, tc.y, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#16a34a';
        ctx.beginPath();
        ctx.arc(tc.x - 4, tc.y - 4, 12, 0, Math.PI * 2);
        ctx.fill();

        // Red apples!
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.arc(tc.x - 5, tc.y + 4, 2.5, 0, Math.PI * 2);
        ctx.arc(tc.x + 5, tc.y - 2, 2.5, 0, Math.PI * 2);
        ctx.arc(tc.x + 2, tc.y + 6, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Exit Landmark: Station 241 Headquarters & US Flag at (750, 520)
      ctx.fillStyle = '#991b1b'; // Firehouse red
      ctx.fillRect(710, 480, 80, 55);
      ctx.strokeStyle = '#f87171';
      ctx.lineWidth = 2;
      ctx.strokeRect(710, 480, 80, 55);
      // Bay door
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(720, 500, 30, 35);
      ctx.fillRect(755, 500, 30, 35);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px sans-serif';
      ctx.fillText('STATION 241', 718, 495);

      // ----------------------------------------------------------------------
      // DRAW RETARDANT CHEMICAL LINES
      // ----------------------------------------------------------------------
      for (const ret of g.retardants) {
        const alpha = Math.min(0.7, ret.timeLeft / 8);
        ctx.fillStyle = `rgba(220, 38, 38, ${alpha})`;
        ctx.fillRect(ret.x - ret.width / 2, ret.y - ret.height / 2, ret.width, ret.height);
        ctx.strokeStyle = `rgba(254, 202, 202, ${alpha * 0.8})`;
        ctx.lineWidth = 2;
        ctx.strokeRect(ret.x - ret.width / 2, ret.y - ret.height / 2, ret.width, ret.height);
      }

      // ----------------------------------------------------------------------
      // DRAW PLACED TOWERS
      // ----------------------------------------------------------------------
      for (const tower of g.placedTowers) {
        const isSelected = selectedPlacedTowerIdRef.current === tower.id;

        // Selection range circle
        if (isSelected) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
          ctx.lineWidth = 2;
          ctx.setLineDash([6, 6]);
          ctx.beginPath();
          ctx.arc(tower.x, tower.y, tower.range, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
          ctx.fill();
          ctx.setLineDash([]);
        }

        // Tower Base Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(tower.x + 3, tower.y + 6, 15, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Render Tower Graphics by Type
        ctx.save();
        ctx.translate(tower.x, tower.y);

        if (tower.typeId === 'river-fireboat') {
          // Marine boat hull
          ctx.rotate(tower.angle);
          ctx.fillStyle = '#f8fafc';
          ctx.beginPath();
          ctx.ellipse(0, 0, 22, 10, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#dc2626';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Cabin & Brass Deck Monitor
          ctx.fillStyle = '#334155';
          ctx.fillRect(-6, -6, 12, 12);
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(4, -3, 14, 6);
        } else if (tower.typeId === 'deck-gun') {
          // Heavy Yellow Deck Gun Base
          ctx.fillStyle = '#eab308';
          ctx.beginPath();
          ctx.arc(0, 0, 16, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#ca8a04';
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // Cannon Barrel
          ctx.rotate(tower.angle);
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(0, -5, 24, 10);
          ctx.fillStyle = '#0284c7';
          ctx.fillRect(16, -4, 8, 8);
        } else if (tower.typeId === 'perimeter-sprinkler') {
          // Sprinkler Base Dome
          ctx.fillStyle = '#0284c7';
          ctx.beginPath();
          ctx.arc(0, 0, 14, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Rotating nozzles
          ctx.rotate(Date.now() * 0.005);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(-14, -2, 28, 4);
          ctx.fillRect(-2, -14, 4, 28);
        } else if (tower.typeId === 'brush-truck') {
          // Red 4x4 Fire Truck Body
          ctx.rotate(tower.angle);
          ctx.fillStyle = '#dc2626';
          ctx.fillRect(-16, -10, 32, 20);
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(-16, -10, 32, 20);

          // Emergency Flasher Bar
          ctx.fillStyle = (Date.now() % 400 < 200) ? '#38bdf8' : '#ef4444';
          ctx.fillRect(-8, -4, 16, 8);
          // High-pressure nozzle
          ctx.fillStyle = '#e2e8f0';
          ctx.fillRect(14, -3, 10, 6);
        } else if (tower.typeId === 'dozer-line') {
          // Mineral Soil trench
          ctx.fillStyle = '#78350f';
          ctx.beginPath();
          ctx.arc(0, 0, 18, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#d97706';
          ctx.lineWidth = 2;
          ctx.stroke();
          // Blade tracks
          ctx.fillStyle = '#451a03';
          ctx.fillRect(-12, -4, 24, 8);
        } else {
          // Hose Volunteer (Firefighter in Yellow Helmet & Turnout Gear)
          ctx.fillStyle = '#b45309'; // Tan bunker gear
          ctx.beginPath();
          ctx.arc(0, 0, 13, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Yellow helmet
          ctx.fillStyle = '#fde047';
          ctx.beginPath();
          ctx.arc(0, -2, 8, 0, Math.PI * 2);
          ctx.fill();

          // Handline Hose
          ctx.rotate(tower.angle);
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(2, -3, 16, 6);
          ctx.fillStyle = '#38bdf8'; // Brass fog nozzle
          ctx.fillRect(14, -4, 5, 8);
        }

        ctx.restore();
      }

      // ----------------------------------------------------------------------
      // DRAW PROJECTILES (WATER DROPS, FOAM, SHELLS)
      // ----------------------------------------------------------------------
      for (const p of g.projectiles) {
        if (p.isFoam) {
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#bae6fd';
          ctx.stroke();
        } else if (p.splashRadius > 0) {
          // Water Bomb Shell
          ctx.fillStyle = '#0284c7';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius + 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        } else {
          // High-Pressure Cyan Droplet
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ----------------------------------------------------------------------
      // DRAW ACTIVE FIRES (THE BALLOONS)
      // ----------------------------------------------------------------------
      for (const fire of g.activeFires) {
        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.beginPath();
        ctx.ellipse(fire.x + 2, fire.y + 4, fire.radius, fire.radius * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Outer Flame Body
        ctx.fillStyle = fire.color;
        ctx.beginPath();
        ctx.arc(fire.x, fire.y, fire.radius, 0, Math.PI * 2);
        ctx.fill();

        // Inner Molten Flame Core
        ctx.fillStyle = fire.coreColor;
        ctx.beginPath();
        ctx.arc(fire.x, fire.y - 2, fire.radius * 0.55, 0, Math.PI * 2);
        ctx.fill();

        // Armored Ring for Charcoal fires
        if (fire.isArmored) {
          ctx.strokeStyle = '#0f172a';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(fire.x, fire.y, fire.radius + 1, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Boss Health Bar
        if (fire.isBoss) {
          const barW = 44;
          ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
          ctx.fillRect(fire.x - barW / 2, fire.y - fire.radius - 12, barW, 6);
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(fire.x - barW / 2, fire.y - fire.radius - 12, barW * (fire.hp / fire.maxHp), 6);
        }
      }

      // ----------------------------------------------------------------------
      // DRAW AIR TANKER PLANE FLIGHT
      // ----------------------------------------------------------------------
      if (g.airTanker && g.airTanker.active) {
        const plane = g.airTanker;
        ctx.save();
        ctx.translate(plane.x, plane.y);

        // Plane Body
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.ellipse(0, 0, 38, 9, 0, 0, Math.PI * 2);
        ctx.fill();

        // Red Fire Engine Markings
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.ellipse(26, 0, 10, 7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(-30, -14, 12, 14);

        // Wings
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(-6, -26, 12, 52);

        ctx.restore();
      }

      // ----------------------------------------------------------------------
      // DRAW STEAM & MIST PARTICLES
      // ----------------------------------------------------------------------
      for (const pt of g.particles) {
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.alpha;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // ----------------------------------------------------------------------
      // ----------------------------------------------------------------------
      // DRAW PLACEMENT GHOST (WHEN HOVERING FROM SHOP)
      // ----------------------------------------------------------------------
      const currentHover = hoverCoordsRef.current;
      const currentAirDrop = isPlacingAirDropRef.current;
      const currentShopConfig = selectedShopConfigRef.current;

      if (currentHover) {
        if (currentAirDrop) {
          // Air Drop crosshair & drop strip preview
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.8)';
          ctx.lineWidth = 2;
          ctx.setLineDash([6, 6]);
          ctx.strokeRect(currentHover.x - 70, currentHover.y - 30, 140, 60);
          ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
          ctx.fillRect(currentHover.x - 70, currentHover.y - 30, 140, 60);
          ctx.setLineDash([]);
        } else if (currentShopConfig) {
          const validity = checkPlacementValidity(currentHover.x, currentHover.y, currentShopConfig, g.placedTowers);

          // Range circle preview
          ctx.strokeStyle = validity.valid ? 'rgba(34, 197, 94, 0.7)' : 'rgba(239, 68, 68, 0.8)';
          ctx.fillStyle = validity.valid ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.25)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(currentHover.x, currentHover.y, currentShopConfig.range, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fill();

          // Unit footprint circle
          ctx.strokeStyle = validity.valid ? '#22c55e' : '#ef4444';
          ctx.beginPath();
          ctx.arc(currentHover.x, currentHover.y, 16, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(gameLoop);
    };

    let fallbackIntervalId: number | null = null;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (!fallbackIntervalId) {
          fallbackIntervalId = window.setInterval(() => {
            if (gameRef.current.gameState === 'wave_active') {
              gameLoop();
            }
          }, 33);
        }
      } else {
        if (fallbackIntervalId) {
          clearInterval(fallbackIntervalId);
          fallbackIntervalId = null;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    handleVisibilityChange();

    (window as any).__dcfd4_game = {
      gameRef,
      tick: (frames = 1) => {
        for (let i = 0; i < frames; i++) {
          gameLoop();
        }
      }
    };

    animId = requestAnimationFrame(gameLoop);
    return () => {
      cancelAnimationFrame(animId);
      if (fallbackIntervalId) clearInterval(fallbackIntervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      delete (window as any).__dcfd4_game;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6 px-3 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* ================================================================== */}
        {/* TOP BAR: LIVES, CASH, ROUND, SPEED, AUDIO                          */}
        {/* ================================================================== */}
        <div className="glass-panel p-3 sm:p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-xl">
          
          {/* Left: Lives & Cash */}
          <div className="flex items-center gap-4">
            {/* Lives */}
            <div className="flex items-center gap-2 bg-red-950/70 border border-red-800/80 px-3.5 py-1.5 rounded-xl shadow-inner min-h-[44px]">
              <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
              <span className="text-lg sm:text-xl font-black text-white">{lives}</span>
              <span className="text-xs text-red-300 font-bold hidden sm:inline">Lives</span>
            </div>

            {/* Cash */}
            <div className="flex items-center gap-2 bg-amber-950/70 border border-amber-600/80 px-3.5 py-1.5 rounded-xl shadow-inner min-h-[44px]">
              <Coins className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span className="text-lg sm:text-xl font-black text-amber-300">${cash}</span>
            </div>

            {/* High Score / Best */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl min-h-[44px] hidden sm:flex">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-slate-400 font-bold">Best:</span>
              <span className="text-sm font-black text-amber-300">{highScore}</span>
            </div>
          </div>

          {/* Center: Round & Title */}
          <div className="text-center order-first sm:order-none w-full sm:w-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700">
              <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
                ROUND {round} / {totalRounds}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              <span className="text-xs font-bold text-slate-300">
                {gameState === 'wave_active' ? 'WAVE IN PROGRESS!' : 'PLACEMENT STAGE'}
              </span>
            </div>
          </div>

          {/* Right: Audio & Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all flex items-center justify-center"
              title="Toggle Game Audio"
            >
              {isAudioEnabled ? <Volume2 className="w-5 h-5 text-emerald-400" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
            </button>

            <button
              onClick={restartGame}
              className="min-h-[44px] px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-bold"
              title="Restart Game"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* ================================================================== */}
        {/* MAIN GAME CONTAINER: CANVAS ON LEFT, BTD SIDEBAR ON RIGHT          */}
        {/* ================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          
          {/* ---------------------------------------------------------------- */}
          {/* THE BATTLEFIELD CANVAS (COLS 1-8)                                */}
          {/* ---------------------------------------------------------------- */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl bg-slate-950 aspect-[840/540]">
            <canvas
              ref={canvasRef}
              width={840}
              height={540}
              onClick={handleCanvasClick}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              className="w-full h-full block cursor-crosshair touch-none"
            />

            {/* OVERLAY: GAME OVER */}
            {gameState === 'game_over' && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-red-600/20 text-red-500 border border-red-500/40 flex items-center justify-center shadow-xl">
                  <Flame className="w-10 h-10 animate-bounce" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                  STATION 241 BREACHED!
                </h2>
                <p className="text-sm text-slate-300 max-w-md">
                  Fires reached the Orondo community. Regroup your volunteer apparatus and try again!
                </p>
                <button
                  onClick={restartGame}
                  className="min-h-[48px] px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-black text-base shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  PLAY AGAIN
                </button>
              </div>
            )}

            {/* OVERLAY: VICTORY */}
            {gameState === 'victory' && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shadow-xl">
                  <Trophy className="w-10 h-10 text-amber-400 animate-pulse" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                  ORONDO SAVED! VICTORY!
                </h2>
                <p className="text-sm text-slate-300 max-w-md">
                  All 20 waves extinguished! Douglas County Fire District 4 defended the orchards and town!
                </p>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-amber-300 font-bold text-sm">
                  Total Final Score: {score} Points
                </div>
                <button
                  onClick={restartGame}
                  className="min-h-[48px] px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-base shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  PLAY NEW GAME
                </button>
              </div>
            )}
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* BTD 5 STYLE TOWER STORE & UPGRADES SIDEBAR (COLS 9-12)           */}
          {/* ---------------------------------------------------------------- */}
          <div className="lg:col-span-4 space-y-3">
            
            {/* PANEL A: TOWER INSPECTOR & UPGRADES (WHEN TOWER CLICKED) */}
            {selectedPlacedTower ? (
              <div className="glass-panel p-4 rounded-3xl border border-amber-500/50 shadow-2xl space-y-4 bg-slate-900/90">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">UNIT UPGRADE DEPOT</span>
                    <h3 className="text-lg font-black text-white">
                      {TOWER_CONFIGS.find(c => c.id === selectedPlacedTower.typeId)?.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedPlacedTowerId(null)}
                    className="min-h-[44px] px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300"
                  >
                    Close
                  </button>
                </div>

                {/* Target Priority Selector */}
                {!selectedPlacedTower.isPassiveTrap && (
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
                      <Crosshair className="w-3.5 h-3.5 text-amber-400" />
                      <span>Targeting Priority:</span>
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {(['first', 'last', 'strongest', 'close'] as TargetPriority[]).map(p => (
                        <button
                          key={p}
                          onClick={() => handleChangePriority(p)}
                          className={`min-h-[44px] py-1 px-2 rounded-xl text-xs font-bold uppercase transition-all ${
                            selectedPlacedTower.targeting === p
                              ? 'bg-amber-600 text-slate-950 font-black shadow-md'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {p === 'strongest' ? 'Strong' : p}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upgrade Path 1 */}
                {(() => {
                  const cfg = TOWER_CONFIGS.find(c => c.id === selectedPlacedTower.typeId);
                  if (!cfg) return null;
                  const currentTier = selectedPlacedTower.path1Tier;
                  const nextUpgrade = cfg.path1[currentTier];

                  return (
                    <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs font-black">
                        <span className="text-blue-400 uppercase">Path 1: Water Pressure</span>
                        <span className="text-slate-400">Tier {currentTier} / 3</span>
                      </div>

                      {nextUpgrade ? (
                        <button
                          onClick={() => handlePurchaseUpgrade(1)}
                          disabled={cash < nextUpgrade.cost}
                          className={`w-full min-h-[44px] p-2.5 rounded-xl text-left transition-all border ${
                            cash >= nextUpgrade.cost
                              ? 'bg-blue-600/20 hover:bg-blue-600/30 border-blue-500/50 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{nextUpgrade.name}</span>
                            <span className="text-xs font-black text-amber-300">${nextUpgrade.cost}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">{nextUpgrade.desc}</p>
                        </button>
                      ) : (
                        <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-400 text-xs font-bold text-center">
                          ✓ MAXIMUM PATH 1 UNLOCKED
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Upgrade Path 2 */}
                {(() => {
                  const cfg = TOWER_CONFIGS.find(c => c.id === selectedPlacedTower.typeId);
                  if (!cfg) return null;
                  const currentTier = selectedPlacedTower.path2Tier;
                  const nextUpgrade = cfg.path2[currentTier];

                  return (
                    <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs font-black">
                        <span className="text-amber-400 uppercase">Path 2: Reach & Foam</span>
                        <span className="text-slate-400">Tier {currentTier} / 3</span>
                      </div>

                      {nextUpgrade ? (
                        <button
                          onClick={() => handlePurchaseUpgrade(2)}
                          disabled={cash < nextUpgrade.cost}
                          className={`w-full min-h-[44px] p-2.5 rounded-xl text-left transition-all border ${
                            cash >= nextUpgrade.cost
                              ? 'bg-amber-600/20 hover:bg-amber-600/30 border-amber-500/50 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{nextUpgrade.name}</span>
                            <span className="text-xs font-black text-amber-300">${nextUpgrade.cost}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">{nextUpgrade.desc}</p>
                        </button>
                      ) : (
                        <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-400 text-xs font-bold text-center">
                          ✓ MAXIMUM PATH 2 UNLOCKED
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Sell Button */}
                <button
                  onClick={handleSellTower}
                  className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800 text-red-300 hover:text-white transition-all flex items-center justify-center gap-2 text-xs font-bold"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                  <span>Sell Unit for ${Math.round(selectedPlacedTower.investedCost * 0.7)} (70% Refund)</span>
                </button>

              </div>
            ) : (
              /* PANEL B: TOWER STORE (BLOONS TD 5 RIGHT SIDEBAR) */
              <div className="glass-panel p-4 rounded-3xl border border-slate-800 shadow-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-black uppercase text-white tracking-wider">APPARATUS STORE</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-semibold">Select to Place</span>
                </div>

                {/* Grid of Towers */}
                <div className="grid grid-cols-2 gap-2">
                  {TOWER_CONFIGS.map(t => {
                    const isSelected = selectedShopTowerId === t.id;
                    const canAfford = cash >= t.cost;

                    return (
                      <button
                        key={t.id}
                        onClick={() => handleSelectShopTower(t.id)}
                        disabled={!canAfford}
                        className={`min-h-[64px] p-2.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-600 text-slate-950 border-amber-400 shadow-lg scale-102 ring-2 ring-white'
                            : canAfford
                            ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 hover:border-slate-700 text-white'
                            : 'bg-slate-950/60 border-slate-900 text-slate-600 cursor-not-allowed opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs font-black leading-tight line-clamp-1">
                            {t.name}
                          </span>
                        </div>

                        <div className="flex items-center justify-between w-full pt-1">
                          <span className={`text-xs font-black ${isSelected ? 'text-slate-950' : 'text-amber-400'}`}>
                            ${t.cost}
                          </span>
                          <span className="text-[10px] font-bold opacity-80">
                            {t.isWaterOnly ? 'River' : t.isPassiveTrap ? 'Trap' : 'Land'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Unit Details Prompt */}
                {selectedShopConfig && (
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-xs space-y-1">
                    <div className="flex items-center justify-between font-black text-amber-300">
                      <span>Click Map to Place {selectedShopConfig.name}</span>
                      <span>${selectedShopConfig.cost}</span>
                    </div>
                    <p className="text-[11px] text-slate-300">{selectedShopConfig.desc}</p>
                  </div>
                )}
              </div>
            )}

            {/* PANEL C: POWER-UPS & AIR TANKER ABILITIES */}
            <div className="glass-panel p-3.5 rounded-3xl border border-slate-800 space-y-2">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">TACTICAL AIR & WATER BOOST</span>

              <div className="grid grid-cols-2 gap-2">
                {/* Air Drop */}
                <button
                  onClick={handleSelectAirDrop}
                  disabled={airDropsAvailable <= 0}
                  className={`min-h-[44px] p-2 rounded-2xl border text-xs font-black transition-all flex items-center justify-center gap-2 ${
                    isPlacingAirDrop
                      ? 'bg-red-600 text-white border-white ring-2 ring-amber-400 animate-pulse'
                      : airDropsAvailable > 0
                      ? 'bg-gradient-to-r from-red-700 to-amber-700 text-white border-red-500 hover:brightness-110 shadow-lg'
                      : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed opacity-50'
                  }`}
                  title="Drop Phos-Chek Slurry Barrier"
                >
                  <Plane className="w-4 h-4 text-white" />
                  <span>AIR DROP ({airDropsAvailable})</span>
                </button>

                {/* RiverCom Pump Overdrive */}
                <button
                  onClick={handleActivatePumpBoost}
                  disabled={pumpBoostCooldown > 0 || isPumpBoostActive || cash < 150}
                  className={`min-h-[44px] p-2 rounded-2xl border text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                    isPumpBoostActive
                      ? 'bg-blue-600 text-white border-blue-400 animate-pulse'
                      : pumpBoostCooldown > 0
                      ? 'bg-slate-900 border-slate-800 text-slate-500'
                      : cash >= 150
                      ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-amber-300'
                      : 'bg-slate-950 border-slate-900 text-slate-600 opacity-50'
                  }`}
                  title="Double all water attack rates for 8s ($150)"
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>
                    {isPumpBoostActive ? 'BOOST ACTIVE!' : pumpBoostCooldown > 0 ? `${pumpBoostCooldown}s` : 'PUMP 2X ($150)'}
                  </span>
                </button>
              </div>
            </div>

            {/* PANEL D: START WAVE & SPEED BUTTONS (ICONIC BIG GREEN BTD BUTTON) */}
            <div className="flex items-center gap-2">
              {gameState === 'wave_active' ? (
                <button
                  onClick={toggleSpeed}
                  className="flex-1 min-h-[52px] px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:brightness-110 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <FastForward className="w-5 h-5 text-slate-950" />
                  <span>SPEED: {gameSpeed}X FAST</span>
                </button>
              ) : (
                <button
                  onClick={startWave}
                  className="flex-1 min-h-[52px] px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:brightness-110 text-slate-950 font-black text-base uppercase tracking-wider shadow-xl flex items-center justify-center gap-2.5 transition-all active:scale-95"
                >
                  <Play className="w-6 h-6 text-slate-950 fill-slate-950" />
                  <span>START ROUND {round}</span>
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Tactical Info Footer Guide */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white">How To Play:</span>
            <span>Place Hose Volunteers, Deck Guns, and Sprinklers along the path. Station Fireboats in the Columbia River. Click placed units to upgrade water strength!</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-bold">Earn Cash Per Fire Layer Popped</span>
            <span>•</span>
            <span className="text-red-400 font-bold">Defend Station 241 at Track End</span>
          </div>
        </div>

      </div>
    </div>
  );
};
