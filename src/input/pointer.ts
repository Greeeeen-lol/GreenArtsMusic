import { ActionState } from '../core/types';
import { InputSource } from './index';

export class PointerSource implements InputSource {
  /** Radians of yaw per pixel of mouse movement. */
  sensitivity = 0.0022;

  /** Largest single-event movement (px) treated as real; see onMouseMove. */
  static readonly MAX_EVENT_DELTA = 250;

  private dx = 0;
  private dy = 0;
  private rightDown = false;
  private el: HTMLElement | null = null;

  private onMouseMove = (e: MouseEvent): void => {
    const mx = e.movementX ?? 0;
    const my = e.movementY ?? 0;
    // Chrome on Windows occasionally reports one bogus mousemove under
    // pointer lock with a delta of hundreds of pixels (often right as the
    // lock engages, or when the hidden cursor would have crossed the
    // window edge). Applied as-is it snaps the view ahead in one frame.
    // No real hand move produces that much in a single event, so drop it.
    if (Math.abs(mx) > PointerSource.MAX_EVENT_DELTA || Math.abs(my) > PointerSource.MAX_EVENT_DELTA) return;
    this.dx += mx;
    this.dy += my;
  };

  private onMouseDown = (e: MouseEvent): void => {
    if (e.button === 2) this.rightDown = true;
    // Left click captures the mouse. This call is the whole reason
    // `requestLock` exists, and for a while nothing made it: the method was
    // defined, correct, and referenced from nowhere, so the lock never
    // engaged. The cursor sat on top of the game and looking around stopped
    // dead at the edge of the window.
    // ...unless the click landed on a 2D overlay that needs the cursor
    // (the examine panel's text input). Those mark themselves data-no-lock.
    const onOverlay = e.target instanceof Element && e.target.closest('[data-no-lock]') !== null;
    if (e.button === 0 && !onOverlay) this.requestLock();
  };

  private onMouseUp = (e: MouseEvent): void => {
    if (e.button === 2) this.rightDown = false;
  };

  private onBlur = (): void => {
    this.rightDown = false;
    this.dx = 0;
    this.dy = 0;
  };

  private onContextMenu = (e: Event): void => {
    e.preventDefault();
  };

  attach(el: HTMLElement): void {
    this.el = el;
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('blur', this.onBlur);
    el.addEventListener('contextmenu', this.onContextMenu);
  }

  detach(): void {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('blur', this.onBlur);
    this.el?.removeEventListener('contextmenu', this.onContextMenu);
    this.el = null;
    this.onBlur();
  }

  /** Called from a click handler; pointer lock requires a user gesture. */
  requestLock(): void {
    // Already captured: asking again is a no-op at best, and in Chrome a
    // second request while locked can reject and churn the console.
    if (this.el && document.pointerLockElement === this.el) return;
    // A browser-denied lock (e.g. called too soon after Escape) rejects the
    // returned promise; swallow it rather than letting it become an
    // unhandled rejection. Keep the optional chaining — the test
    // environment has no requestPointerLock.
    // `unadjustedMovement` asks for raw mouse deltas, bypassing OS pointer
    // acceleration — the other half of the "snaps ahead" feel. Browsers
    // that don't support it reject, so fall back to a plain lock.
    const el = this.el;
    const lock = el?.requestPointerLock as
      | ((opts?: { unadjustedMovement?: boolean }) => Promise<void> | void)
      | undefined;
    if (!el || !lock) return;
    const raw = lock.call(el, { unadjustedMovement: true });
    if (raw && typeof raw.catch === 'function') {
      raw.catch(() => {
        el.requestPointerLock?.()?.catch?.(() => {});
      });
    }
  }

  contribute(out: ActionState, _dtMs: number): void {
    out.lookX += this.dx * this.sensitivity;
    out.lookY += this.dy * this.sensitivity;
    this.dx = 0;
    this.dy = 0;
    out.holdToSee = out.holdToSee || this.rightDown;
  }
}
