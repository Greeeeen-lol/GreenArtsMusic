/**
 * Player preferences from the pause menu. Kept apart from the game save on
 * purpose: the save is story state (door 01 resets part of it, a version
 * bump discards it), and nobody should lose their volume to either.
 */
export const SETTINGS_KEY = 'greenart.arg.settings';

export interface Settings {
  /** 0-1, the whole mix. */
  volume: number;
  /** Multiplier on mouse and touch look, 0.25-2. */
  lookSpeed: number;
  /** Up is down. */
  invertY: boolean;
}

export const LOOK_SPEED_MIN = 0.25;
export const LOOK_SPEED_MAX = 2;

export function defaultSettings(): Settings {
  return { volume: 1, lookSpeed: 1, invertY: false };
}

function clampNum(v: unknown, lo: number, hi: number, fallback: number): number {
  return typeof v === 'number' && Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : fallback;
}

export function loadSettings(storage?: Storage): Settings {
  const base = defaultSettings();
  try {
    const raw = (storage ?? globalThis.localStorage)?.getItem(SETTINGS_KEY);
    if (!raw) return base;
    const p = JSON.parse(raw) as Record<string, unknown>;
    return {
      volume: clampNum(p.volume, 0, 1, base.volume),
      lookSpeed: clampNum(p.lookSpeed, LOOK_SPEED_MIN, LOOK_SPEED_MAX, base.lookSpeed),
      invertY: p.invertY === true,
    };
  } catch {
    return base;
  }
}

export function writeSettings(s: Settings, storage?: Storage): void {
  try {
    (storage ?? globalThis.localStorage)?.setItem(SETTINGS_KEY, JSON.stringify(s));
  } catch {
    // Storage denied. Settings last the session.
  }
}
