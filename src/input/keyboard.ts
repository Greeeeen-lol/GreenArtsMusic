import { ActionState } from '../core/types';
import { InputSource } from './index';

const TAP_WINDOW_MS = 600;

const FORWARD = new Set(['KeyW', 'ArrowUp']);
const BACK = new Set(['KeyS', 'ArrowDown']);
const LEFT = new Set(['KeyA', 'ArrowLeft']);
const RIGHT = new Set(['KeyD', 'ArrowRight']);
const INTERACT = new Set(['KeyE']);
const LET_GO = new Set(['KeyQ']);
const HOLD_TO_SEE = new Set(['ShiftLeft', 'ShiftRight']);

export class KeyboardSource implements InputSource {
  private down = new Set<string>();
  private interactPressed = false;
  private interactReleased = false;
  private letGoPressed = false;
  private heldMs = 0;
  private releasedHeldMs = 0;
  private tapTimes: number[] = [];
  private elapsedMs = 0;

  private onKeyDown = (e: KeyboardEvent): void => {
    if (this.down.has(e.code)) return;
    this.down.add(e.code);
    if (INTERACT.has(e.code)) {
      this.interactPressed = true;
      this.heldMs = 0;
      this.tapTimes.push(this.elapsedMs);
    }
    if (LET_GO.has(e.code)) this.letGoPressed = true;
  };

  private onKeyUp = (e: KeyboardEvent): void => {
    this.down.delete(e.code);
    if (INTERACT.has(e.code)) {
      this.interactReleased = true;
      this.releasedHeldMs = this.heldMs;
      this.heldMs = 0;
    }
  };

  private onBlur = (): void => {
    this.down.clear();
    this.heldMs = 0;
  };

  attach(_el: HTMLElement): void {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('blur', this.onBlur);
  }

  detach(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('blur', this.onBlur);
    this.down.clear();
    this.heldMs = 0;
    this.tapTimes = [];
    this.interactPressed = false;
    this.interactReleased = false;
    this.letGoPressed = false;
    this.releasedHeldMs = 0;
    this.elapsedMs = 0;
  }

  private anyDown(codes: Set<string>): boolean {
    for (const c of codes) if (this.down.has(c)) return true;
    return false;
  }

  contribute(out: ActionState, dtMs: number): void {
    this.elapsedMs += dtMs;

    if (this.anyDown(FORWARD)) out.moveY += 1;
    if (this.anyDown(BACK)) out.moveY -= 1;
    if (this.anyDown(RIGHT)) out.moveX += 1;
    if (this.anyDown(LEFT)) out.moveX -= 1;

    const interactDown = this.anyDown(INTERACT);
    if (interactDown) this.heldMs += dtMs;

    out.interactDown = out.interactDown || interactDown;
    out.interactPressed = out.interactPressed || this.interactPressed;
    out.interactReleased = out.interactReleased || this.interactReleased;
    out.interactHeldMs = Math.max(
      out.interactHeldMs,
      this.interactReleased ? this.releasedHeldMs : this.heldMs,
    );
    out.letGoPressed = out.letGoPressed || this.letGoPressed;
    out.holdToSee = out.holdToSee || this.anyDown(HOLD_TO_SEE);

    this.tapTimes = this.tapTimes.filter((t) => this.elapsedMs - t <= TAP_WINDOW_MS);
    out.interactTapCount = Math.max(out.interactTapCount, this.tapTimes.length);

    this.interactPressed = false;
    this.interactReleased = false;
    this.letGoPressed = false;
  }
}
