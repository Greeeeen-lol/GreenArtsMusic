import * as THREE from 'three';

/**
 * Shared look for every hand-built PS1/N64-register model in Ch1: flat
 * shading plus an affine vertex-snap in the vertex shader, so straight
 * edges wobble slightly as the camera moves — the thing that actually
 * reads as "N64" rather than just "low triangle count." Ported from two
 * Three.js showcases built against this project's exact dimension table.
 *
 * One flag controls it everywhere. It defaults on because that IS the
 * requested art style; if it reads as too aggressive in play, flip
 * `PS1_JITTER_ENABLED` here — every material built through `retroMaterial`
 * picks up the change without touching a single model file, because they
 * all share one uniform object.
 */
export let PS1_JITTER_ENABLED = true;

export function setPs1JitterEnabled(on: boolean): void {
  PS1_JITTER_ENABLED = on;
  jitterUniform.value = on ? 1.0 : 0.0;
}

const jitterUniform = { value: PS1_JITTER_ENABLED ? 1.0 : 0.0 };

/**
 * Snaps clip-space position to a coarse integer grid — the classic PS1
 * affine-transform artifact. 128 divisions read as period-correct without
 * making small props (keys, bookmark) illegible; raise it if the smallest
 * props wobble enough to hide their silhouette.
 */
const SNAP_GRID = 128.0;

export function applyPS1Shader(
  material: THREE.MeshLambertMaterial,
): THREE.MeshLambertMaterial {
  material.flatShading = true;
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uJitterEnabled = jitterUniform;
    shader.vertexShader = `uniform float uJitterEnabled;\n${shader.vertexShader}`;
    shader.vertexShader = shader.vertexShader.replace(
      '#include <project_vertex>',
      `
      vec4 mvPosition = vec4( transformed, 1.0 );
      mvPosition = modelViewMatrix * mvPosition;
      gl_Position = projectionMatrix * mvPosition;

      if (uJitterEnabled > 0.5) {
        gl_Position.xyz /= gl_Position.w;
        gl_Position.xy = floor(gl_Position.xy * ${SNAP_GRID.toFixed(1)}) / ${SNAP_GRID.toFixed(1)};
        gl_Position.xyz *= gl_Position.w;
      }
      `,
    );
  };
  return material;
}

/**
 * For a surface laid flat against another — a rug on the floor, a clock
 * face on its rim, pages in a cover. The snap above moves each mesh's
 * vertices independently by up to ~1/256 of the screen, so two surfaces a
 * few millimetres apart trade places pixel by pixel as the camera moves,
 * worst at grazing angles like the floor. Biasing the top surface's depth
 * toward the camera keeps it in front whatever the snap does. Mutates and
 * returns `material`: give it one no other mesh shares.
 */
export function decal<T extends THREE.Material>(material: T): T {
  material.polygonOffset = true;
  material.polygonOffsetFactor = -4;
  material.polygonOffsetUnits = -4;
  return material;
}

/** A flat-color material with the shared PS1 shader applied. */
export function retroColor(color: number): THREE.MeshLambertMaterial {
  return applyPS1Shader(new THREE.MeshLambertMaterial({ color }));
}

/**
 * Generates a small nearest-filtered CanvasTexture rather than loading an
 * image file — zero network requests, zero bytes added to the teaser (this
 * module is only ever reached from world/**, never the entry chunk), and
 * the blockiness IS the period-correct look at 32-64px with no mipmaps.
 *
 * `furniture.ts`/`props.ts` call model builders directly in plain unit
 * tests that never touch a renderer — the same shape that made
 * `EnterWorldOptions.createRenderer`/`createAudioContext` necessary.
 * happy-dom has no 2D canvas context, so `getContext('2d')` returns null
 * there. Rather than plumb an injection point through every model builder
 * for a texture nothing in a test ever inspects, this degrades to an
 * unpainted (blank) texture when no context is available. A real browser
 * always has one; only the test environment does not, and a blank texture
 * there is harmless because nothing renders it.
 */
export function pixelTexture(
  size: number,
  paint: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) paint(ctx, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  return texture;
}

/** A textured material with the shared PS1 shader applied. */
export function retroTextured(texture: THREE.Texture): THREE.MeshLambertMaterial {
  return applyPS1Shader(new THREE.MeshLambertMaterial({ map: texture }));
}
