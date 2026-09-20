/**
 * The single contract between input and everything else. One is produced per
 * frame by InputRouter.update(). Edge flags (`*Pressed`, `*Released`) are true
 * for exactly one frame.
 */
export interface ActionState {
  /** Strafe, -1 (left) to 1 (right). */
  moveX: number;
  /** Forward/back, -1 (back) to 1 (forward). */
  moveY: number;
  /** Look delta this frame, radians. */
  lookX: number;
  lookY: number;
  interactDown: boolean;
  interactPressed: boolean;
  interactReleased: boolean;
  /** Milliseconds the interact input has been held; on the release frame this
   * is the final duration, and it returns to 0 the frame after. */
  interactHeldMs: number;
  /** Number of interact taps within the recent tap window. Drives `break`. */
  interactTapCount: number;
  letGoPressed: boolean;
  holdToSee: boolean;
}

export function emptyActions(): ActionState {
  return {
    moveX: 0,
    moveY: 0,
    lookX: 0,
    lookY: 0,
    interactDown: false,
    interactPressed: false,
    interactReleased: false,
    interactHeldMs: 0,
    interactTapCount: 0,
    letGoPressed: false,
    holdToSee: false,
  };
}
