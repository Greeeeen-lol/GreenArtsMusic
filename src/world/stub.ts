/**
 * Placeholder for the 3D world, loaded only after the DONE page's gate is
 * passed. It exists now so the code-splitting boundary is real and tested
 * from day one — Plan 1c fills in the body.
 *
 * This module, and only this module, may import the engine.
 */
export async function enterWorld(): Promise<void> {
  // Nothing behind the gate yet. The page stays black, which is the
  // intended day-one ending: four seconds of song, then nothing.
}
