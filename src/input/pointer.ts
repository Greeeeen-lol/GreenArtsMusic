import { ActionState } from '../core/types';
import { InputSource } from './index';

export class PointerSource implements InputSource {
  /** Radians of yaw per pixel of mouse movement. */
  sensitivity = 0.0022;

  private dx = 0;
  private dy = 0;
  private rightDown = false;
  private el: HTMLElement | null = null;

  private onMouseMove = (e: MouseEvent): void => {
    this.dx += e.movementX ?? 0;
    this.dy += e.movementY ?? 0;
  };

  private onMouseDown = (e: MouseEvent): void => {
    if (e.button === 2) this.rightDown = true;
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
    // A browser-denied lock (e.g. called too soon after Escape) rejects the
    // returned promise; swallow it rather than letting it become an
    // unhandled rejection. Keep the optional chaining — the test
    // environment has no requestPointerLock.
    this.el?.requestPointerLock?.()?.catch(() => {});
  }

  contribute(out: ActionState, _dtMs: number): void {
    out.lookX += this.dx * this.sensitivity;
    out.lookY += this.dy * this.sensitivity;
    this.dx = 0;
    this.dy = 0;
    out.holdToSee = out.holdToSee || this.rightDown;
  }
}
