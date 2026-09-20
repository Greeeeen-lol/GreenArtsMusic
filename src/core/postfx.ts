import * as THREE from 'three';

/**
 * Single fullscreen pass: film grain plus vignette. This is the only
 * post-processing the game is permitted. No EffectComposer — one extra
 * draw, sampling the scene render target.
 */
export function createGrainVignettePass(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      tDiffuse: { value: null as THREE.Texture | null },
      uTime: { value: 0 },
      uGrain: { value: 0.055 },
      uVignette: { value: 1.15 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D tDiffuse;
      uniform float uTime;
      uniform float uGrain;
      uniform float uVignette;
      varying vec2 vUv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      void main() {
        vec4 color = texture2D(tDiffuse, vUv);

        float n = hash(vUv * 1024.0 + uTime) - 0.5;
        color.rgb += n * uGrain;

        vec2 d = vUv - 0.5;
        float vig = 1.0 - smoothstep(0.15, 0.85, dot(d, d) * uVignette * 2.0);
        color.rgb *= vig;

        gl_FragColor = color;
      }
    `,
    depthTest: false,
    depthWrite: false,
  });
}
