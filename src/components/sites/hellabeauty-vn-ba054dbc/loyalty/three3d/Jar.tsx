import * as THREE from "three";
import { useMemo } from "react";

export const JAR = {
  radius: 2.7, // inner radius of the body (bigger than the reference)
  height: 5.2, // body height stars can fill
  floorY: 0,
};

/** Profile of a classic mason-style jar: straight body, rounded shoulder, short neck. */
function jarProfile() {
  const { radius, height } = JAR;
  const pts: THREE.Vector2[] = [];
  pts.push(new THREE.Vector2(0, -0.12));
  pts.push(new THREE.Vector2(radius * 0.84, -0.12));
  pts.push(new THREE.Vector2(radius * 0.98, 0.18));
  pts.push(new THREE.Vector2(radius, height * 0.6));
  // shoulder curve
  const shoulder = new THREE.QuadraticBezierCurve(
    new THREE.Vector2(radius, height * 0.6),
    new THREE.Vector2(radius * 1.02, height * 0.98),
    new THREE.Vector2(radius * 0.64, height * 1.06),
  );
  shoulder.getPoints(18).forEach((p, i) => i > 0 && pts.push(p));
  // neck
  pts.push(new THREE.Vector2(radius * 0.6, height * 1.14));
  pts.push(new THREE.Vector2(radius * 0.62, height * 1.22));
  return pts;
}

export function Jar() {
  const geo = useMemo(() => {
    const g = new THREE.LatheGeometry(jarProfile(), 96);
    g.computeVertexNormals();
    return g;
  }, []);

  const { radius, height, floorY } = JAR;

  // subtle glass thread ridges around the neck
  const threads = useMemo(
    () => [0, 1, 2].map((i) => height * 1.02 + i * 0.06),
    [height],
  );

  return (
    <group>
      {/* glass shell */}
      <mesh geometry={geo} position={[0, floorY, 0]} renderOrder={2}>
        <meshPhysicalMaterial
          color="#eef8fb"
          transparent
          opacity={0.16}
          roughness={0.04}
          metalness={0}
          transmission={0.92}
          thickness={1.2}
          clearcoat={1}
          clearcoatRoughness={0.03}
          ior={1.5}
          reflectivity={0.35}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* faint inner tint so the body reads as glass, not empty air */}
      <mesh geometry={geo} position={[0, floorY, 0]} scale={0.985} renderOrder={1}>
        <meshBasicMaterial
          color="#dff0f4"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* thicker glass base */}
      <mesh position={[0, floorY - 0.1, 0]} receiveShadow>
        <cylinderGeometry args={[radius * 0.9, radius * 0.82, 0.22, 72]} />
        <meshPhysicalMaterial
          color="#cfe6ec"
          transparent
          opacity={0.5}
          roughness={0.16}
          metalness={0.1}
          transmission={0.6}
          thickness={0.6}
          clearcoat={1}
        />
      </mesh>

      {/* neck thread ridges */}
      {threads.map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation-x={Math.PI / 2}>
          <torusGeometry args={[radius * 0.62, 0.03, 8, 72]} />
          <meshPhysicalMaterial
            color="#eef8fb"
            transparent
            opacity={0.25}
            roughness={0.1}
            transmission={0.7}
          />
        </mesh>
      ))}

      {/* brushed-gold rim ring */}
      <mesh position={[0, floorY + height * 1.22, 0]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[radius * 0.62, 0.085, 16, 72]} />
        <meshStandardMaterial
          color="#e8c46a"
          roughness={0.28}
          metalness={0.85}
          emissive="#5a4413"
          emissiveIntensity={0.25}
        />
      </mesh>
    </group>
  );
}
