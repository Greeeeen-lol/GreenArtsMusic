import * as THREE from 'three';

export const MAX_TRIANGLES = 40_000;
export const MAX_MESHES = 60;
export const MAX_TEXTURE_PX = 512;
export const MAX_DRAW_CALLS = 60;

export interface SceneBudget {
  triangles: number;
  meshes: number;
  materials: number;
  maxTexturePx: number;
  drawCalls: number;
}

function collectTextures(value: unknown, out: number[], depth: number): void {
  // Depth budget covers the deepest real path:
  //   material(0) -> uniforms(1) -> { value }(2) -> Texture(3)
  if (depth > 3 || value === null || value === undefined) return;

  if (value instanceof THREE.Texture) {
    const img = value.image as { width?: number; height?: number } | undefined;
    if (img?.width) out.push(Math.max(img.width, img.height ?? 0));
    return;
  }

  if (Array.isArray(value)) {
    for (const v of value) collectTextures(v, out, depth + 1);
    return;
  }

  if (typeof value === 'object') {
    for (const v of Object.values(value as Record<string, unknown>)) {
      collectTextures(v, out, depth + 1);
    }
  }
}

function textureSizes(material: THREE.Material): number[] {
  const out: number[] = [];
  collectTextures(material, out, 0);
  return out;
}

export function measureScene(root: THREE.Object3D): SceneBudget {
  let triangles = 0;
  let meshes = 0;
  let drawCalls = 0;
  const materials = new Set<THREE.Material>();
  let maxTexturePx = 0;

  root.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return;
    meshes++;

    const geometry = obj.geometry as THREE.BufferGeometry;
    const index = geometry.getIndex();
    const position = geometry.getAttribute('position');
    if (index) triangles += index.count / 3;
    else if (position) triangles += position.count / 3;

    const materialList = Array.isArray(obj.material) ? obj.material : [obj.material];
    drawCalls += Array.isArray(obj.material)
      ? (geometry.groups.length > 0 ? geometry.groups.length : materialList.length)
      : 1;

    for (const m of materialList) {
      if (!m) continue;
      materials.add(m);
      for (const size of textureSizes(m)) {
        maxTexturePx = Math.max(maxTexturePx, size);
      }
    }
  });

  return { triangles: Math.round(triangles), meshes, materials: materials.size, maxTexturePx, drawCalls };
}

/** Returns violation messages. An empty array means the scene is within budget. */
export function assertWithinBudget(root: THREE.Object3D): string[] {
  const b = measureScene(root);
  const violations: string[] = [];
  if (b.triangles > MAX_TRIANGLES) {
    violations.push(`triangle budget exceeded: ${b.triangles} > ${MAX_TRIANGLES}`);
  }
  if (b.meshes > MAX_MESHES) {
    violations.push(`mesh budget exceeded: ${b.meshes} > ${MAX_MESHES}`);
  }
  if (b.drawCalls > MAX_DRAW_CALLS) {
    violations.push(`draw call budget exceeded: ${b.drawCalls} > ${MAX_DRAW_CALLS}`);
  }
  if (b.maxTexturePx > MAX_TEXTURE_PX) {
    violations.push(`texture budget exceeded: ${b.maxTexturePx}px > ${MAX_TEXTURE_PX}px`);
  }
  return violations;
}
