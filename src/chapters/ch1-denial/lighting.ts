import * as THREE from 'three';

/**
 * The apartment's own room lighting, ported from the same retro showcase
 * the layout and the shell's look came from: a cool blue-grey ambient
 * fill, a warm lamp hanging over the table, and cold moonlight coming in
 * from the window side. Logan preferred that look over the lantern alone,
 * which left everything past arm's reach near-black.
 *
 * The showcase ran three r128 with legacy lights and no tone mapping; this
 * project runs three 0.186 (physical units only) under ACESFilmic (see
 * engine.ts). Legacy intensities do not carry over one to one — ambient and
 * directional need roughly a x PI lift to match, and the lamp's falloff
 * curve is different — so these numbers were tuned in-browser against a
 * side-by-side of the showcase, not converted by formula.
 */
export const ROOM_LIGHTING = {
  ambient: { color: 0x404552, intensity: 8 },
  lamp: { color: 0xffb366, intensity: 4, distance: 8, decay: 0, position: [0, 1.4, 0] },
  moon: { color: 0x4a6582, intensity: 4.5, position: [-4, 3, -1] },
  fog: { color: 0x0e1114, density: 0.08 },
} as const;

export interface RoomLights {
  group: THREE.Group;
  lamp: THREE.PointLight;
}

export function buildRoomLights(): RoomLights {
  const { ambient, lamp, moon } = ROOM_LIGHTING;
  const group = new THREE.Group();

  group.add(new THREE.AmbientLight(ambient.color, ambient.intensity));

  const lampLight = new THREE.PointLight(lamp.color, lamp.intensity, lamp.distance, lamp.decay);
  lampLight.position.set(...lamp.position);
  group.add(lampLight);

  // Directional lights aim at their target (the origin by default), so the
  // position alone sets the direction: in from the -x/-z window side.
  const moonLight = new THREE.DirectionalLight(moon.color, moon.intensity);
  moonLight.position.set(...moon.position);
  group.add(moonLight);

  return { group, lamp: lampLight };
}
