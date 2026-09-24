import type { Chapter, ChapterRouter } from '../core/chapter';
import type { ActionState } from '../core/types';

export type ChapterFactory = (id: string) => Chapter;

/** Black comes down this fast when a chapter asks to leave… */
export const CURTAIN_CLOSE_S = 0.8;
/** …and lifts this slowly on the far side. */
export const CURTAIN_OPEN_S = 1.4;

type Phase = 'idle' | 'closing' | 'loading' | 'opening';

/**
 * Walks the player from one chapter to the next. Every fixed step it asks
 * the current chapter whether it wants to hand off (`Chapter.next()`); when
 * one does, a black curtain comes down over the overlay, the router swaps
 * chapters behind it, and the curtain lifts on the new one.
 *
 * The chapters themselves never construct each other — they only name where
 * they want to go — so the hallway and chapter one can send the player back
 * and forth without importing one another.
 */
export class WorldFlow {
  private router: ChapterRouter;
  private make: ChapterFactory;
  private curtain: HTMLDivElement;
  private phase: Phase = 'idle';
  private t = 0;
  private pending: string | null = null;
  private id: string | null = null;
  private disposed = false;

  constructor(router: ChapterRouter, overlay: HTMLElement, make: ChapterFactory) {
    this.router = router;
    this.make = make;
    this.curtain = document.createElement('div');
    this.curtain.className = 'curtain';
    this.curtain.setAttribute('aria-hidden', 'true');
    Object.assign(this.curtain.style, {
      position: 'absolute',
      inset: '0',
      background: '#000',
      pointerEvents: 'none',
      zIndex: '40',
      opacity: '0',
    });
    overlay.appendChild(this.curtain);
  }

  get currentId(): string | null {
    return this.id;
  }

  get busy(): boolean {
    return this.phase !== 'idle';
  }

  /** Sends the player to `id` as if the current chapter had asked to go
   *  there. Ignored mid-swap. (The dev panel's jump buttons.) */
  goTo(id: string): void {
    if (this.phase !== 'idle') return;
    this.curtain.style.background = '#000';
    this.pending = id;
    this.phase = 'closing';
    this.t = 0;
  }

  /** Loads the first chapter under a closed curtain, then lets it lift. */
  async start(id: string): Promise<void> {
    this.curtain.style.background = '#000';
    this.setCurtain(1);
    this.phase = 'loading';
    await this.swap(id);
  }

  fixedUpdate(dt: number, actions: ActionState): void {
    this.router.fixedUpdate(dt, actions);
    switch (this.phase) {
      case 'idle': {
        const next = this.router.current()?.next?.() ?? null;
        if (!next) return;
        const exit = typeof next === 'string' ? { to: next } : next;
        this.curtain.style.background = exit.color ?? '#000';
        this.pending = exit.to;
        this.t = 0;
        if (exit.cut) {
          this.setCurtain(1);
          this.phase = 'loading';
          void this.swap(exit.to);
        } else {
          this.phase = 'closing';
        }
        return;
      }
      case 'closing': {
        this.t += dt;
        const k = Math.min(1, this.t / CURTAIN_CLOSE_S);
        this.setCurtain(k);
        if (k >= 1) {
          this.phase = 'loading';
          void this.swap(this.pending!);
        }
        return;
      }
      case 'opening': {
        this.t += dt;
        const k = Math.min(1, this.t / CURTAIN_OPEN_S);
        this.setCurtain(1 - k);
        if (k >= 1) this.phase = 'idle';
        return;
      }
      case 'loading':
        return;
    }
  }

  private async swap(id: string): Promise<void> {
    await this.router.load(this.make(id));
    if (this.disposed) return;
    this.id = id;
    this.pending = null;
    this.phase = 'opening';
    this.t = 0;
  }

  private setCurtain(opacity: number): void {
    this.curtain.style.opacity = String(opacity);
  }

  dispose(): void {
    this.disposed = true;
    this.curtain.remove();
  }
}
