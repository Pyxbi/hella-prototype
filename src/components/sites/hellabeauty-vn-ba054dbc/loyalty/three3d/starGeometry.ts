import * as THREE from "three";

/**
 * A 5-point star extruded with soft, rounded bevels so it catches light like a
 * little gold charm rather than a flat sticker. Slightly deeper bevel + more
 * curve segments than the reference for a jewel-ish read.
 */
export function createStarGeometry(
  outer = 0.62,
  inner = 0.27,
  points = 5,
  depth = 0.1,
) {
  const shape = new THREE.Shape();
  const step = Math.PI / points;
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = i * step - Math.PI / 2;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.045,
    bevelSize: 0.05,
    bevelSegments: 3,
    curveSegments: 2,
  });
  geo.center();
  geo.computeVertexNormals();
  return geo;
}
