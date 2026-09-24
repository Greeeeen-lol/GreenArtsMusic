import './done.css';
import { FRAGMENTS, QUESTION, type Fragment } from './fragments';
import { checkAnswer, isStartWord, START_WORD } from './gate';
import { LIGHT_RADIUS_VMIN, toPercent, maskValue } from './lightfield';
import { clampCenterX, clampCenterYAbove, keyboardInsetPx, MIN_PROMPT_GAP_PX } from './layout';
import { collapsePlan, collapseTotalMs } from './collapse';
import { loadSave, writeSave } from '../core/save';

export interface DonePageOptions {
  root: HTMLElement;
  /** URL of the payoff fragment. */
  audioSrc: string;
  /** Called once, after the collapse sequence finishes. */
  onSolved: () => void;
  /**
   * Called once, when the second word is accepted. `null` in a teaser build
   * — the release gate. With `onStart: null` the page must give no sign the
   * word means anything: no hint appears, and typing it is never
   * acknowledged.
   */
  onStart: (() => void) | null;
}

/** The word that comes apart once the answer is accepted. */
const WORD = 'DONE';

/**
 * A pointer that moves less than this between down and up is a tap, not a
 * sweep of the light. Only a tap refocuses the input — otherwise every drag
 * across the page would reopen the on-screen keyboard over the very thing
 * the visitor is trying to read.
 */
const TAP_SLOP_PX = 10;

interface PlacedFragment {
  fragment: Fragment;
  el: HTMLElement;
}

export class DonePage {
  readonly root: HTMLElement;

  private readonly audioSrc: string;
  private readonly onSolvedCallback: () => void;
  private readonly onStartCallback: (() => void) | null;

  private fragmentsEl!: HTMLDivElement;
  private wordEl!: HTMLDivElement;
  private readonly letterEls: HTMLElement[] = [];
  private readonly placed: PlacedFragment[] = [];
  private questionEntry: PlacedFragment | null = null;
  private formEl!: HTMLFormElement;
  private inputEl!: HTMLInputElement;
  private caretEl!: HTMLSpanElement;
  private hintEl!: HTMLSpanElement;
  private audioEl!: HTMLAudioElement;

  // Pointer throttling: events write here; at most one mask update per frame
  // is scheduled from it. Direct calls to `movePointer` (from tests, or any
  // other caller) bypass the throttle and write immediately.
  private pendingX = 0;
  private pendingY = 0;
  private rafId: number | null = null;
  private layoutRafId: number | null = null;

  private tapStartX = 0;
  private tapStartY = 0;

  private solveTimer: number | null = null;
  private isSolved = false;
  private disposed = false;
  private audioUnlocked = false;
  private unlockInFlight = false;
  private payoffStarted = false;
  private audioWarmed = false;
  private audioFailed = false;
  private startShown = false;
  private started = false;

  constructor(opts: DonePageOptions) {
    this.root = opts.root;
    this.audioSrc = opts.audioSrc;
    this.onSolvedCallback = opts.onSolved;
    this.onStartCallback = opts.onStart;
  }

  get solved(): boolean {
    return this.isSolved;
  }

  /** True once the second word will be accepted and the hint is on screen. */
  get startAvailable(): boolean {
    return this.startShown;
  }

  /**
   * True once the browser has told us the payoff asset itself is unusable
   * (404, wrong MIME type, corrupt file). Deliberately distinct from a
   * `play()` that was merely blocked: both used to land in the same silent
   * `.catch()`, which is how a dead `.wav` path reached the artist as
   * "silence on a correct answer" with nothing in the console.
   */
  get audioLoadFailed(): boolean {
    return this.audioFailed;
  }

  /** The payoff element. Exposed so tests can drive real media events. */
  get audioElement(): HTMLAudioElement {
    return this.audioEl;
  }

  mount(): void {
    this.root.classList.add('done');

    this.fragmentsEl = this.buildFragments();
    this.wordEl = this.buildWord();
    this.formEl = this.buildPrompt();

    this.root.appendChild(this.fragmentsEl);
    this.root.appendChild(this.wordEl);
    this.root.appendChild(this.formEl);

    this.audioEl = new Audio(this.audioSrc);
    // 349 KB is not worth downloading for a visitor who bounces in two
    // seconds. `warmAudio()` fetches it on the first real interaction,
    // which is long before anyone can solve the page.
    this.audioEl.preload = 'none';
    this.audioEl.addEventListener('error', this.handleAudioError);
    this.audioEl.addEventListener('ended', this.handleAudioEnded);
    // A payoff that never plays at all (Low Power Mode, a blocked play(), a
    // 404) must not strand a visitor who has already solved the page.
    this.audioEl.addEventListener('error', this.handleAudioEnded);

    // A returning visitor who solved this in an earlier session is let
    // straight back in — they do not solve it twice, and they do not sit
    // through the payoff again to be given the word.
    if (this.onStartCallback && loadSave().doneSolved) this.revealStart();

    this.root.addEventListener('pointermove', this.handlePointerMove);
    this.root.addEventListener('pointerdown', this.handlePointerDown);
    this.root.addEventListener('pointerup', this.handlePointerUp);
    this.root.addEventListener('touchstart', this.handleTouchStart, { passive: true });
    this.root.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    this.formEl.addEventListener('submit', this.handleSubmit);
    this.inputEl.addEventListener('input', this.syncCaret);
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('orientationchange', this.handleResize);

    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener('resize', this.handleViewportChange);
      vv.addEventListener('scroll', this.handleViewportChange);
    }

    // The page's one required action gets an affordance: the field is
    // focused from the start, so a desktop visitor can simply type.
    this.focusInput();
    this.syncCaret();
    this.layout();
    this.handleViewportChange();
    // Metrics can still be settling on the first frame (font metrics, the
    // mobile toolbar). Re-measure once the first paint is done.
    this.layoutRafId = window.requestAnimationFrame(() => {
      this.layoutRafId = null;
      this.layout();
    });
  }

  /**
   * Moves the light. Writes the mask synchronously — throttling to one write
   * per frame happens upstream, in the event handlers that call this, not
   * here, so a caller that wants an immediate update (tests, or any other
   * direct caller) gets one.
   */
  movePointer(clientX: number, clientY: number): void {
    // Measure the element the mask is written onto, not the window. Under
    // the iOS dynamic toolbar `window.innerHeight` and the field's own box
    // diverge, and the light drifts from the finger exactly when the visitor
    // is hunting near the bottom of the page.
    const rect = this.fragmentsEl.getBoundingClientRect();
    const w = rect.width > 0 ? rect.width : window.innerWidth;
    const h = rect.height > 0 ? rect.height : window.innerHeight;
    const pos = toPercent(clientX - rect.left, clientY - rect.top, w, h);
    const mask = maskValue(pos, LIGHT_RADIUS_VMIN);
    this.fragmentsEl.style.maskImage = mask;
    this.fragmentsEl.style.webkitMaskImage = mask;
  }

  /**
   * Re-places every fragment against the measured viewport.
   *
   * Two invariants, neither of which can hold without real measurements: no
   * fragment hangs off either edge (three of them did at every viewport size,
   * one of them a copy of the answer), and the question keeps a clear gap
   * above the prompt.
   */
  layout(): void {
    const vw = window.innerWidth > 0 ? window.innerWidth : 1;
    const vh = window.innerHeight > 0 ? window.innerHeight : 1;

    for (const entry of this.placed) {
      const width = entry.el.getBoundingClientRect().width;
      const center = clampCenterX((entry.fragment.x / 100) * vw, width, vw);
      entry.el.style.left = `${round2(center)}px`;
      entry.el.style.top = `${round2((entry.fragment.y / 100) * vh)}px`;
    }

    const question = this.questionEntry;
    if (question) {
      const promptTop = this.formEl.getBoundingClientRect().top;
      // A zero rect means nothing has been laid out yet (or we are in a DOM
      // that does no layout at all); leave the authored position alone
      // rather than shoving the question off the top of the page.
      if (promptTop > 0) {
        const height = question.el.getBoundingClientRect().height;
        const center = clampCenterYAbove(
          (question.fragment.y / 100) * vh,
          height,
          promptTop - MIN_PROMPT_GAP_PX,
        );
        question.el.style.top = `${round2(center)}px`;
      }
    }
  }

  async typeAnswer(text: string): Promise<boolean> {
    // The second word is checked first, but only counts once the answer has
    // been solved. Typed by someone who has not solved it, this falls
    // through to checkAnswer, fails, and does nothing — no error, no hint
    // that the word meant anything. Being told the word must not be a way
    // past the puzzle.
    const onStart = this.onStartCallback;
    if (onStart && this.startShown && !this.started && isStartWord(text)) {
      this.started = true;
      onStart();
      return true;
    }

    const ok = await checkAnswer(text);
    // checkAnswer crosses a real async boundary (crypto.subtle), so by the
    // time we're back here dispose() may already have torn the page down.
    if (this.disposed) return false;
    if (!ok) return false;
    if (this.isSolved) return true;
    this.isSolved = true;

    this.collapseWord();

    const save = loadSave();
    save.doneSolved = true;
    writeSave(save);

    // Claim the element for the real payoff explicitly: it may still be
    // muted, and unlockAudio()'s muted probe play() may still be in flight
    // (its cleanup checks `payoffStarted` and backs off once this is set,
    // so it can never pause/rewind/re-mute what we start here). A blocked
    // play() must never break the collapse.
    this.payoffStarted = true;
    this.audioEl.muted = false;
    this.audioEl.currentTime = 0;
    void this.audioEl.play().catch((err: unknown) => {
      // A blocked play() and a broken asset are two different bugs and must
      // not look identical from the outside. The collapse proceeds either way.
      if (this.audioFailed) {
        console.error(
          `[done] the payoff could not play: the audio asset at ${this.audioSrc} failed to load`,
        );
      } else {
        console.warn('[done] the payoff was blocked by the browser', err);
      }
    });

    this.solveTimer = window.setTimeout(() => {
      this.solveTimer = null;
      this.onSolvedCallback();
    }, collapseTotalMs(WORD));

    return true;
  }

  dispose(): void {
    this.disposed = true;

    this.root.removeEventListener('pointermove', this.handlePointerMove);
    this.root.removeEventListener('pointerdown', this.handlePointerDown);
    this.root.removeEventListener('pointerup', this.handlePointerUp);
    this.root.removeEventListener('touchstart', this.handleTouchStart);
    this.root.removeEventListener('touchmove', this.handleTouchMove);
    this.formEl.removeEventListener('submit', this.handleSubmit);
    this.inputEl.removeEventListener('input', this.syncCaret);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('orientationchange', this.handleResize);

    const vv = window.visualViewport;
    if (vv) {
      vv.removeEventListener('resize', this.handleViewportChange);
      vv.removeEventListener('scroll', this.handleViewportChange);
    }

    if (this.rafId !== null) {
      window.cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.layoutRafId !== null) {
      window.cancelAnimationFrame(this.layoutRafId);
      this.layoutRafId = null;
    }
    if (this.solveTimer !== null) {
      window.clearTimeout(this.solveTimer);
      this.solveTimer = null;
    }

    this.audioEl.removeEventListener('error', this.handleAudioError);
    this.audioEl.removeEventListener('ended', this.handleAudioEnded);
    this.audioEl.removeEventListener('error', this.handleAudioEnded);
    // Do NOT cut off a payoff that has already started. onSolved fires at
    // collapseTotalMs (1200ms) while the clip runs ~8.9s, and whoever handles
    // onSolved may well tear this page down to hand over to the world — the
    // sound is meant to carry across that seam. The element was created with
    // `new Audio()` and was never in the DOM, so leaving it playing holds
    // nothing else alive.
    if (!this.payoffStarted) {
      this.audioEl.pause();
    }

    this.letterEls.length = 0;
    this.placed.length = 0;
    this.questionEntry = null;
    this.root.classList.remove('done');
    this.root.replaceChildren();
  }

  private buildFragments(): HTMLDivElement {
    const field = document.createElement('div');
    field.className = 'done__fragments';
    for (const fragment of FRAGMENTS) {
      const span = document.createElement('span');
      span.className = 'done__fragment';
      span.textContent = fragment.text;
      // Authored position. `layout()` overwrites both with measured pixels
      // as soon as the element is in the document.
      span.style.left = `${fragment.x}%`;
      span.style.top = `${fragment.y}%`;
      span.style.transform = 'translate(-50%, -50%)';
      span.style.fontSize = `calc(var(--base) * ${fragment.scale ?? 1})`;
      field.appendChild(span);
      const entry: PlacedFragment = { fragment, el: span };
      this.placed.push(entry);
      if (fragment.text === QUESTION) this.questionEntry = entry;
    }
    // Never fully blank before the first pointer event.
    const initialMask = maskValue({ xPct: 50, yPct: 50 }, LIGHT_RADIUS_VMIN);
    field.style.maskImage = initialMask;
    field.style.webkitMaskImage = initialMask;
    return field;
  }

  private buildWord(): HTMLDivElement {
    const word = document.createElement('div');
    word.className = 'done__word';
    for (const char of WORD) {
      const letter = document.createElement('span');
      letter.className = 'done__letter';
      letter.textContent = char;
      word.appendChild(letter);
      this.letterEls.push(letter);
    }
    return word;
  }

  private buildPrompt(): HTMLFormElement {
    const form = document.createElement('form');
    form.className = 'done__prompt';

    // Before the field, so it sits above the rule rather than under it.
    // `aria-hidden` because the hint is decorative reinforcement of a word
    // the input's own accessible name should carry; a screen reader
    // announcing a bare "start" floating beside a text field is noise.
    this.hintEl = document.createElement('span');
    this.hintEl.className = 'done__hint';
    this.hintEl.setAttribute('aria-hidden', 'true');
    form.appendChild(this.hintEl);

    const field = document.createElement('div');
    field.className = 'done__field';

    this.inputEl = document.createElement('input');
    this.inputEl.className = 'done__input';
    this.inputEl.type = 'text';
    this.inputEl.setAttribute('inputmode', 'text');
    this.inputEl.setAttribute('autocomplete', 'off');
    this.inputEl.setAttribute('autocapitalize', 'off');
    this.inputEl.setAttribute('autocorrect', 'off');
    this.inputEl.setAttribute('spellcheck', 'false');
    // An accessible name only. It must not hand over the puzzle, and there
    // is deliberately no placeholder explaining what to type.
    this.inputEl.setAttribute('aria-label', 'answer');
    this.inputEl.setAttribute('enterkeyhint', 'go');

    // Our own caret. The native one only exists while the field is focused
    // and iOS may not paint one at all — but this underline and its blink
    // are the page's only signal that anything is waiting for the visitor,
    // so they cannot depend on focus.
    this.caretEl = document.createElement('span');
    this.caretEl.className = 'done__caret';
    this.caretEl.setAttribute('aria-hidden', 'true');

    field.appendChild(this.inputEl);
    field.appendChild(this.caretEl);
    form.appendChild(field);
    return form;
  }

  private collapseWord(): void {
    const plan = collapsePlan(WORD);
    for (let i = 0; i < this.letterEls.length; i++) {
      const letter = this.letterEls[i];
      const fall = plan[i];
      if (!letter || !fall) continue;
      letter.style.setProperty('--rot', `${fall.rotateDeg}deg`);
      letter.style.animationDelay = `${fall.delayMs}ms`;
      letter.style.animationDuration = `${fall.durationMs}ms`;
    }
    this.wordEl.classList.add('is-collapsing');
  }

  private focusInput(): void {
    try {
      this.inputEl.focus({ preventScroll: true });
    } catch {
      /* focus is an affordance, never a requirement */
    }
  }

  /** The caret stands in for an empty field; once there is text, it goes. */
  private readonly syncCaret = (): void => {
    this.formEl.classList.toggle('is-typing', this.inputEl.value.length > 0);
  };

  /**
   * Pulls the 349 KB payoff down on the first real interaction with the page.
   * `preload` is `'none'`, so nothing is fetched for a visitor who bounces;
   * by the time anyone has touched the page they are engaged, and the file is
   * warm long before they can solve it.
   */
  private warmAudio(): void {
    if (this.audioWarmed) return;
    this.audioWarmed = true;
    try {
      // `load()` alone is not enough: it re-runs resource selection, but a
      // browser is free to keep deferring the actual fetch while preload is
      // still 'none' (Chrome does). Lifting preload first is what turns the
      // warm-up into a real download.
      this.audioEl.preload = 'auto';
      this.audioEl.load();
    } catch {
      /* the payoff still tries to play on solve */
    }
  }

  private readonly handleAudioError = (): void => {
    this.audioFailed = true;
    const code = this.audioEl.error?.code;
    console.error(
      `[done] the payoff audio failed to load: ${this.audioSrc}` +
        (code === undefined ? '' : ` (MediaError code ${code})`),
    );
  };

  private revealStart(): void {
    // No callback means the world is withheld: there is nowhere to go, so
    // there is nothing to hint at.
    if (!this.onStartCallback || this.startShown) return;
    this.startShown = true;
    this.hintEl.textContent = START_WORD;
    this.hintEl.classList.add('is-shown');
  }

  private readonly handleAudioEnded = (): void => {
    this.revealStart();
  };

  private readonly handlePointerMove = (e: PointerEvent): void => {
    this.scheduleMove(e.clientX, e.clientY);
  };

  private readonly handlePointerDown = (e: PointerEvent): void => {
    this.warmAudio();
    this.tapStartX = e.clientX;
    this.tapStartY = e.clientY;
  };

  private readonly handlePointerUp = (e: PointerEvent): void => {
    const moved = Math.hypot(e.clientX - this.tapStartX, e.clientY - this.tapStartY);
    // A tap anywhere puts the caret back: dismissing the on-screen keyboard
    // must not permanently orphan the one input on the page. A sweep of the
    // light is not a tap, and must not summon the keyboard either.
    if (moved <= TAP_SLOP_PX) this.focusInput();
  };

  private readonly handleTouchStart = (): void => {
    this.warmAudio();
  };

  private readonly handleTouchMove = (e: TouchEvent): void => {
    // The page must never scroll or rubber-band under a touch drag.
    e.preventDefault();
    const touch = e.touches[0];
    if (touch) this.scheduleMove(touch.clientX, touch.clientY);
  };

  private readonly handleResize = (): void => {
    this.layout();
  };

  /**
   * Keeps the prompt above the on-screen keyboard. Without this the visitor
   * cannot see what they are typing on a phone: the keyboard covers the
   * bottom of the layout viewport, and the prompt lives there.
   */
  private readonly handleViewportChange = (): void => {
    const vv = window.visualViewport;
    if (!vv) return;
    const inset = keyboardInsetPx(window.innerHeight, vv.height, vv.offsetTop);
    this.formEl.style.setProperty('--kb', `${Math.round(inset)}px`);
  };

  private scheduleMove(x: number, y: number): void {
    this.pendingX = x;
    this.pendingY = y;
    if (this.rafId !== null) return;
    this.rafId = window.requestAnimationFrame(() => {
      this.rafId = null;
      this.movePointer(this.pendingX, this.pendingY);
    });
  }

  private readonly handleSubmit = (e: Event): void => {
    e.preventDefault();
    // Must run synchronously, before any await, to still be inside the
    // gesture that permits playback.
    this.warmAudio();
    this.unlockAudio();
    const value = this.inputEl.value;
    this.inputEl.value = '';
    this.syncCaret();
    void this.typeAnswer(value);
  };

  /**
   * Safari only permits playback that begins inside a user gesture. The answer
   * check awaits crypto.subtle, which crosses a real async boundary and revokes
   * that permission — so we "bless" the element synchronously here, during the
   * submit gesture itself, and the later play() in typeAnswer then succeeds.
   * Muted during the unlock so nothing is audible if the answer is wrong.
   *
   * The unlock only latches once the probe actually RESOLVES. iOS Low Power
   * Mode rejects even a muted play(), and latching on the attempt meant a
   * single rejection killed the payoff for the rest of the visit: every later
   * submit returned early and the element was never blessed. On rejection the
   * flag stays down and the next submit tries again.
   *
   * This probe play() and the real payoff play() (in typeAnswer's success
   * branch) both start from handleSubmit with no ordering between them: on
   * real devices HTMLMediaElement.play() only resolves once playback has
   * actually begun (tens of ms), while checkAnswer's crypto.subtle.digest
   * typically resolves first — so the payoff can easily already be playing
   * by the time this settles. The cleanup below checks `payoffStarted` and
   * backs off if it's set, so it can never pause/rewind/re-mute a payoff
   * that has already claimed the element.
   */
  private unlockAudio(): void {
    if (this.audioUnlocked || this.unlockInFlight) return;
    this.unlockInFlight = true;
    const el = this.audioEl;
    const wasMuted = el.muted;
    // Nothing audible may ever come out of a wrong answer. Every play() this
    // method can reach happens with the element muted.
    el.muted = true;

    const cleanup = (): void => {
      if (this.payoffStarted) return;
      el.pause();
      el.currentTime = 0;
      el.muted = wasMuted;
    };

    // `.then(cleanup, cleanup)` rather than `.then(cleanup).catch(cleanup)`:
    // the latter runs cleanup a second time if cleanup itself throws.
    void el.play().then(
      () => {
        this.unlockInFlight = false;
        this.audioUnlocked = true;
        cleanup();
      },
      () => {
        // Blocked, not unlocked: leave the latch down so the next submit
        // retries. One rejection must not kill the payoff for the visit.
        this.unlockInFlight = false;
        cleanup();
      },
    );
  }
}

/** Two decimals is finer than any of these measurements can justify. */
function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
