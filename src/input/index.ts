import { ActionState, emptyActions } from '../core/types';

export interface InputSource {
  attach(el: HTMLElement): void;
  detach(): void;
  /** Add this source's contribution to the frame's action state. */
  contribute(out: ActionState, dtMs: number): void;
}

export class InputRouter {
  private sources: InputSource[] = [];
  private state: ActionState = emptyActions();
  private attached: HTMLElement | null = null;

  add(source: InputSource): this {
    this.sources.push(source);
    if (this.attached) source.attach(this.attached);
    return this;
  }

  attach(el: HTMLElement): void {
    this.attached = el;
    for (const s of this.sources) s.attach(el);
  }

  detach(): void {
    for (const s of this.sources) s.detach();
    this.attached = null;
    this.state = emptyActions();
  }

  update(dtMs: number): Readonly<ActionState> {
    const out = emptyActions();
    for (const s of this.sources) s.contribute(out, dtMs);

    const len = Math.hypot(out.moveX, out.moveY);
    if (len > 1) {
      out.moveX /= len;
      out.moveY /= len;
    }

    this.state = out;
    return this.state;
  }
}
