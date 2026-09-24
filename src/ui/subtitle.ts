// Owns its own CSS — nothing else imports style.css, and without this
// import `.subtitle`/`.subtitle--visible` never load: the game's only line
// of text would render unstyled (default black text) against the black
// background, invisible in a real browser while every test here stays
// green (happy-dom does no CSS layout at all).
import '../style.css';

export const SUBTITLE_MIN_MS = 1800;

/**
 * The only persistent 2D surface during play. Not a HUD: it is empty except in
 * the moment a line is surfacing.
 */
export class Subtitle {
  private el: HTMLDivElement;
  private queue: { text: string; minMs: number }[] = [];
  private showing: string | null = null;
  private remainingMs = 0;
  private disposed = false;
  /** Called as each line surfaces. The chapter hangs its text blip here. */
  onLine: ((text: string) => void) | null = null;

  constructor(root: HTMLElement) {
    this.el = document.createElement('div');
    this.el.className = 'subtitle';
    this.el.setAttribute('aria-live', 'polite');
    root.appendChild(this.el);
  }

  show(text: string, minMs: number = SUBTITLE_MIN_MS): void {
    if (this.disposed) return;
    const trimmed = text.trim();
    if (!trimmed) return;
    if (this.showing === trimmed && this.queue.length === 0) return;
    if (this.queue[this.queue.length - 1]?.text === trimmed) return;

    this.queue.push({ text: trimmed, minMs });
    if (this.showing === null) this.advance();
  }

  private advance(): void {
    const next = this.queue.shift() ?? null;
    this.showing = next?.text ?? null;
    this.remainingMs = next?.minMs ?? 0;
    this.el.textContent = next?.text ?? '';
    this.el.classList.toggle('subtitle--visible', next !== null);
    if (next) this.onLine?.(next.text);
  }

  update(dtMs: number): void {
    if (this.disposed || this.showing === null) return;
    this.remainingMs -= dtMs;
    if (this.remainingMs <= 0) this.advance();
  }

  current(): string | null {
    return this.showing;
  }

  /**
   * Empties the queue and hides any showing line, without disposing the
   * instance — it remains usable afterward. Call this on a chapter swap so
   * a line left over from the outgoing chapter cannot bleed into the next
   * one; `dispose()` is for tearing the surface down entirely.
   */
  clear(): void {
    if (this.disposed) return;
    this.queue = [];
    this.showing = null;
    this.remainingMs = 0;
    this.el.textContent = '';
    this.el.classList.remove('subtitle--visible');
  }

  dispose(): void {
    this.disposed = true;
    this.queue = [];
    this.showing = null;
    this.el.remove();
  }
}
