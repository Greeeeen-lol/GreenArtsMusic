// Owns its own CSS, the way Subtitle owns style.css: nothing else imports it,
// and happy-dom would never notice it missing.
import './examine.css';

export interface ExaminePrompt {
  question: string;
  /** Returns the feedback line, and whether the prompt is now answered. */
  submit(raw: string): { line: string; done: boolean };
}

export interface ExamineOpen {
  title: string;
  /** Preformatted text. */
  body: string;
  prompt?: ExaminePrompt;
  /** Shown instead of a prompt once the thing has been read. */
  solvedNote?: string;
}

export type CloseHow = 'escape' | 'click';

export interface ExamineSounds {
  /** Every key typed into a prompt, Enter included. */
  keystroke?(): void;
  /** A feedback line appearing under the prompt. */
  line?(): void;
}

/**
 * The one place the game lets you read something up close: a notebook page,
 * a laptop screen, a letter. Not a HUD — it exists only while you are
 * holding something up to the light, and it closes the moment you look away.
 *
 * It does not block the game's own keyboard listener (KeyboardSource hears
 * every key on window). The chapter feeds its systems empty actions while
 * `isOpen` is true instead, so typing "w" into the prompt never walks.
 */
export class Examine {
  private root: HTMLElement;
  private el: HTMLDivElement | null = null;
  private onClose: ((how: CloseHow) => void) | null = null;
  private disposed = false;
  private sounds: ExamineSounds;

  constructor(root: HTMLElement, sounds: ExamineSounds = {}) {
    this.root = root;
    this.sounds = sounds;
  }

  get isOpen(): boolean {
    return this.el !== null;
  }

  open(doc: ExamineOpen, onClose?: (how: CloseHow) => void): void {
    if (this.disposed) return;
    this.teardown();
    this.onClose = onClose ?? null;

    const el = document.createElement('div');
    el.className = 'examine';
    el.setAttribute('data-no-lock', '');
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', doc.title);

    const panel = document.createElement('div');
    panel.className = 'examine__panel';
    el.appendChild(panel);

    const title = document.createElement('div');
    title.className = 'examine__title';
    title.textContent = doc.title;
    panel.appendChild(title);

    const body = document.createElement('pre');
    body.className = 'examine__body';
    body.textContent = doc.body;
    panel.appendChild(body);

    let input: HTMLInputElement | null = null;
    if (doc.solvedNote !== undefined) {
      const solved = document.createElement('div');
      solved.className = 'examine__solved';
      solved.textContent = doc.solvedNote;
      panel.appendChild(solved);
    } else if (doc.prompt) {
      const prompt = doc.prompt;
      const wrap = document.createElement('label');
      wrap.className = 'examine__prompt';
      const q = document.createElement('span');
      q.className = 'examine__question';
      q.textContent = prompt.question;
      wrap.appendChild(q);
      input = document.createElement('input');
      input.className = 'examine__input';
      input.type = 'text';
      input.autocomplete = 'off';
      input.spellcheck = false;
      input.setAttribute('autocapitalize', 'off');
      input.setAttribute('aria-label', prompt.question);
      wrap.appendChild(input);
      panel.appendChild(wrap);

      const feedback = document.createElement('div');
      feedback.className = 'examine__feedback';
      feedback.setAttribute('aria-live', 'polite');
      panel.appendChild(feedback);

      const field = input;
      field.addEventListener('keydown', (e) => {
        if (!field.disabled && (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter')) {
          this.sounds.keystroke?.();
        }
        if (e.key !== 'Enter') return;
        e.preventDefault();
        const raw = field.value;
        if (!raw.trim()) return;
        const result = prompt.submit(raw);
        field.value = '';
        feedback.textContent = result.line;
        this.sounds.line?.();
        // Restart the fade so a repeated "no." still reads as a response.
        feedback.classList.remove('is-new');
        void feedback.offsetWidth;
        feedback.classList.add('is-new');
        if (result.done) {
          field.disabled = true;
          wrap.classList.add('is-done');
        }
      });
    }

    const close = document.createElement('button');
    close.className = 'examine__close';
    close.type = 'button';
    close.textContent = 'leave it';
    close.addEventListener('click', () => this.close('click'));
    panel.appendChild(close);

    this.root.appendChild(el);
    this.el = el;
    window.addEventListener('keydown', this.onKeyDown);

    // Give the cursor back so the player can click and type. The player
    // re-captures it with a click on the room, as they did the first time.
    document.exitPointerLock?.();
    input?.focus();
  }

  close(how: CloseHow = 'click'): void {
    if (!this.el) return;
    const cb = this.onClose;
    this.teardown();
    cb?.(how);
  }

  dispose(): void {
    this.teardown();
    this.disposed = true;
  }

  private onKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') this.close('escape');
  };

  private teardown(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    this.el?.remove();
    this.el = null;
    this.onClose = null;
  }
}
