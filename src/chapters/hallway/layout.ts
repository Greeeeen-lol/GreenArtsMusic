/**
 * The hallway's numbers, in world metres. Pure data, no Three — so the
 * layout can be tested without building anything.
 *
 * The corridor runs along Z. The spawn end is +Z (the near wall, behind
 * the player); the frost door closes the far end at -Z. Dimensions follow
 * the reference hallway (D:\retro_ps1_hotel_hallway.html), shortened a
 * little at the near end so the player does not arrive with nothing behind
 * door 01 but four metres of carpet.
 */
export const HALL = {
  width: 3.6,
  height: 3.2,
  nearZ: 15,
  farZ: -16,
  /** Top of the wood panelling; wallpaper above. */
  wainscot: 1.1,
} as const;

export const DOOR = { width: 1.1, height: 2.25, depth: 0.06 } as const;

/** Which wall a door is in: -1 is the left wall (x < 0) facing down the hall. */
export type Side = -1 | 1;

export interface DoorSlot {
  /** Album track, 1-based. Track 1 is chapter one's room. */
  track: number;
  /** What the brass plate says. */
  label: string;
  side: Side;
  /** Centre of the doorway along the hall. */
  z: number;
}

/** Five pairs, down the hall from the spawn end. */
const PAIR_Z = [12, 6.5, 1, -4.5, -10] as const;

/** Ten tracks: odd on the left, even on the right, facing each other. */
export const DOOR_SLOTS: readonly DoorSlot[] = PAIR_Z.flatMap((z, i) => {
  const odd = i * 2 + 1;
  return [
    { track: odd, label: String(odd).padStart(2, '0'), side: -1 as Side, z },
    { track: odd + 1, label: String(odd + 1).padStart(2, '0'), side: 1 as Side, z },
  ];
});

/**
 * Behind door 01: a short passage of light, this deep (x, into the left
 * wall). The player walks into it and chapter one comes up out of the white.
 */
export const PASSAGE = { depth: 2.2, height: DOOR.height + 0.07 } as const;

/** Ceiling lamps, down the middle of the hall. */
export const LAMP_Z: readonly number[] = [12.5, 6.5, 0.5, -5.5, -11.5];
/** The one that can't hold steady. Index into LAMP_Z. */
export const FLICKER_LAMP = 2;

/**
 * Just out of door 01, a step into the hall, facing down it toward the
 * frost door (yaw 0 faces -Z; see core/player.ts).
 */
export const SPAWN: { position: [number, number, number]; yaw: number } = {
  position: [-0.8, 0, 12.4],
  yaw: 0,
};
