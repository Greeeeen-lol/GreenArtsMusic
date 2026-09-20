import { clamp } from '../core/math';
import { ActionState } from '../core/types';
import { InputSource } from './index';

export const STICK_RADIUS_PX = 60;
// A thumb-drift allowance, not a mouse-precision value: a thumb held still
// for a 350ms long-press drifts well past a value tuned for a mouse click,
// so a tight threshold here made long-press (and therefore take/examine)
// fail to register at all on a real device.
export const TAP_MAX_PX = 28;
export const LONG_PRESS_MS = 350;
export const SWIPE_DOWN_PX = 80;
export const LOOK_SENSITIVITY = 0.005;

interface Tracked {
  id: number;
  startX: number;
  startY: number;
  x: number;
  y: number;
  heldMs: number;
  swiped: boolean;
}

export class TouchSource implements InputSource {
  private el: HTMLElement | null = null;
  private stick: Tracked | null = null;
  private look: Tracked | null = null;
  private activeCount = 0;
  private lookDx = 0;
  private lookDy = 0;
  private released = false;
  private releasedHeldMs = 0;
  private letGo = false;

  private isLeftHalf(x: number): boolean {
    const width = this.el?.clientWidth ?? 1;
    return x < width / 2;
  }

  /**
   * True when more fingers are on the screen than are bound to a control.
   * The stick is the left half and look is the right half, so ordinary
   * two-thumb play (one stick finger + one look finger) touches the screen
   * with two fingers — the same finger count as the hold-to-see gesture.
   * Counting only UNASSIGNED fingers is what tells them apart: two fingers
   * in the same half, or a third finger anywhere, are still hold-to-see.
   */
  private isHolding(): boolean {
    const assigned = (this.stick ? 1 : 0) + (this.look ? 1 : 0);
    return this.activeCount > assigned;
  }

  private onStart = (e: Event): void => {
    const te = e as Event & { changedTouches: ArrayLike<Touch>; touches: ArrayLike<Touch> };
    this.activeCount = te.touches.length;
    for (let i = 0; i < te.changedTouches.length; i++) {
      const t = te.changedTouches[i]!;
      const tracked: Tracked = {
        id: t.identifier,
        startX: t.clientX,
        startY: t.clientY,
        x: t.clientX,
        y: t.clientY,
        heldMs: 0,
        swiped: false,
      };
      if (this.isLeftHalf(t.clientX)) {
        if (!this.stick) this.stick = tracked;
      } else if (!this.look) {
        this.look = tracked;
      }
    }
    if (this.isHolding()) {
      // A hold-to-see gesture just began (this touch pushed the finger
      // count past what's bound to stick+look). Drop any interact release
      // still pending from before, so it cannot leak out once the hold
      // ends — see I2 in the Task 14 review.
      this.released = false;
    }
    e.preventDefault();
  };

  private onMove = (e: Event): void => {
    const te = e as Event & { changedTouches: ArrayLike<Touch>; touches: ArrayLike<Touch> };
    this.activeCount = te.touches.length;
    for (let i = 0; i < te.changedTouches.length; i++) {
      const t = te.changedTouches[i]!;
      if (this.stick && t.identifier === this.stick.id) {
        this.stick.x = t.clientX;
        this.stick.y = t.clientY;
      }
      if (this.look && t.identifier === this.look.id) {
        this.lookDx += t.clientX - this.look.x;
        this.lookDy += t.clientY - this.look.y;
        this.look.x = t.clientX;
        this.look.y = t.clientY;
        if (!this.look.swiped && this.look.y - this.look.startY >= SWIPE_DOWN_PX) {
          this.look.swiped = true;
          this.letGo = true;
        }
      }
    }
    e.preventDefault();
  };

  private onEnd = (e: Event): void => {
    const te = e as Event & { changedTouches: ArrayLike<Touch>; touches: ArrayLike<Touch> };
    this.activeCount = Math.max(0, te.touches.length);
    for (let i = 0; i < te.changedTouches.length; i++) {
      const t = te.changedTouches[i]!;
      if (this.stick && t.identifier === this.stick.id) this.stick = null;
      if (this.look && t.identifier === this.look.id) {
        const travelled = Math.hypot(
          this.look.x - this.look.startX,
          this.look.y - this.look.startY,
        );
        if (!this.look.swiped && travelled <= TAP_MAX_PX) {
          this.released = true;
          this.releasedHeldMs = this.look.heldMs;
        }
        this.look = null;
        this.lookDx = 0;
        this.lookDy = 0;
      }
    }
  };

  attach(el: HTMLElement): void {
    this.el = el;
    el.addEventListener('touchstart', this.onStart, { passive: false });
    el.addEventListener('touchmove', this.onMove, { passive: false });
    el.addEventListener('touchend', this.onEnd);
    el.addEventListener('touchcancel', this.onEnd);
  }

  detach(): void {
    const el = this.el;
    if (el) {
      el.removeEventListener('touchstart', this.onStart);
      el.removeEventListener('touchmove', this.onMove);
      el.removeEventListener('touchend', this.onEnd);
      el.removeEventListener('touchcancel', this.onEnd);
    }
    this.el = null;
    this.stick = null;
    this.look = null;
    this.activeCount = 0;
    this.lookDx = 0;
    this.lookDy = 0;
    this.released = false;
    this.releasedHeldMs = 0;
    this.letGo = false;
  }

  contribute(out: ActionState, dtMs: number): void {
    const holding = this.isHolding();

    if (this.stick) {
      const dx = clamp((this.stick.x - this.stick.startX) / STICK_RADIUS_PX, -1, 1);
      const dy = clamp((this.stick.y - this.stick.startY) / STICK_RADIUS_PX, -1, 1);
      out.moveX += dx;
      out.moveY += -dy;
    }

    out.lookX += this.lookDx * LOOK_SENSITIVITY;
    out.lookY += this.lookDy * LOOK_SENSITIVITY;
    this.lookDx = 0;
    this.lookDy = 0;

    // The right-half ("look") finger doubles as the interact finger, but
    // while a hold-to-see gesture is active that finger's own lift must not
    // read as an interact release (I2) — an ordinary hold-to-see would
    // otherwise end in an unwanted "examine" every time.
    if (!holding) {
      if (this.look && !this.look.swiped) {
        this.look.heldMs += dtMs;
        const travelled = Math.hypot(
          this.look.x - this.look.startX,
          this.look.y - this.look.startY,
        );
        if (travelled <= TAP_MAX_PX) {
          out.interactDown = true;
          out.interactHeldMs = Math.max(out.interactHeldMs, this.look.heldMs);
        }
      }

      if (this.released) {
        out.interactReleased = true;
        out.interactHeldMs = Math.max(out.interactHeldMs, this.releasedHeldMs);
        out.interactTapCount = Math.max(out.interactTapCount, 1);
        this.released = false;
      }
    }

    if (this.letGo) {
      out.letGoPressed = true;
      this.letGo = false;
    }

    out.holdToSee = out.holdToSee || holding;
  }
}
