/// <reference types="vite/client" />

/**
 * Build-time constant, replaced by Vite's `define` (see vite.config.ts).
 * `true` only in a world build; the literal `false` in a teaser build, which
 * is what lets the bundler eliminate the engine's dynamic import entirely.
 */
declare const __WORLD__: boolean;
