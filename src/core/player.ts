import type * as THREE from 'three';
import { clamp } from './math';
import type { ActionState } from './types';
import { AABB, resolveMove } from './collision';

export const PLAYER_RADIUS = 0.3;
export const PLAYER_HEIGHT = 1.7;
export const PLAYER_EYE = 1.6;
export const WALK_SPEED = 2.4;
export const PITCH_LIMIT = Math.PI / 2 - 0.01;

export class Player {
  position: [number, number, number] = [0, 0, 0];
  /** Radians. 0 faces -Z. Positive look delta turns right (decreasing yaw). */
  yaw = 0;
  pitch = 0;
  /** True only when the player's position actually changed this frame.
   * Pressing into a wall is not moving. */
  moving = false;

  /**
   * Repositions and refaces the player, zeroing pitch and moving. Call this
   * on every chapter swap — facing is not a per-chapter convention a
   * chapter can opt out of: ChapterRouter calls it with a documented
   * default before a chapter loads, and the chapter's own load() then
   * overrides it with its actual spawn point and facing.
   */
  reset(position: [number, number, number] = [0, 0, 0], yaw = 0): void {
    this.position = position;
    this.yaw = yaw;
    this.pitch = 0;
    this.moving = false;
  }

  update(
    dtSeconds: number,
    actions: ActionState,
    boxes: readonly AABB[],
    frozen: boolean,
  ): void {
    this.yaw -= actions.lookX;
    this.pitch = clamp(this.pitch - actions.lookY, -PITCH_LIMIT, PITCH_LIMIT);

    if (frozen) {
      this.moving = false;
      return;
    }

    const forwardX = -Math.sin(this.yaw);
    const forwardZ = -Math.cos(this.yaw);
    const rightX = Math.cos(this.yaw);
    const rightZ = -Math.sin(this.yaw);

    const dx = (forwardX * actions.moveY + rightX * actions.moveX) * WALK_SPEED * dtSeconds;
    const dz = (forwardZ * actions.moveY + rightZ * actions.moveX) * WALK_SPEED * dtSeconds;

    if (dx === 0 && dz === 0) {
      this.moving = false;
      return;
    }

    const prevX = this.position[0];
    const prevZ = this.position[2];
    this.position = resolveMove(
      boxes, this.position, PLAYER_RADIUS, PLAYER_HEIGHT, [dx, 0, dz],
    );
    this.moving = this.position[0] !== prevX || this.position[2] !== prevZ;
  }

  applyTo(camera: THREE.PerspectiveCamera): void {
    camera.position.set(this.position[0], this.position[1] + PLAYER_EYE, this.position[2]);
    camera.rotation.order = 'YXZ';
    camera.rotation.y = this.yaw;
    camera.rotation.x = this.pitch;
    camera.rotation.z = 0;
  }
}
