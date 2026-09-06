import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { JAR } from "./Jar";
import { createStarGeometry } from "./starGeometry";

const GRAVITY = 8.2;
const STAR_R = 0.58;
// Soft champagne → warm gold. Tasteful, brand-adjacent, never garish.
const PALETTE = ["#f4d488", "#e8c46a", "#f7e6b5", "#eab857", "#f0cf7e"];

type Star = {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  rot: THREE.Euler;
  spin: THREE.Vector3;
  resting: boolean;
  active: boolean; // has been released into the scene
  delay: number; // seconds until release (staggered pour)
  born: number; // seconds since release (drives scale-in)
  scale: number;
  landedCounted: boolean;
};

/** Inner radius the star centres must stay within, at a given height. */
function wallLimit(y: number): number {
  const body = JAR.radius - STAR_R;
  const neckStart = JAR.height * 0.6;
  const neckTop = JAR.height * 1.22;
  if (y <= neckStart) return body;
  const neckR = JAR.radius * 0.6 - STAR_R * 0.4;
  if (y >= neckTop) return neckR;
  const t = (y - neckStart) / (neckTop - neckStart);
  return body + (neckR - body) * t;
}

function makeStar(i: number, stagger: number): Star {
  const a = Math.random() * Math.PI * 2;
  const r = Math.random() * (JAR.radius * 0.42 - STAR_R);
  return {
    pos: new THREE.Vector3(
      Math.cos(a) * r,
      JAR.height * 1.4 + 2 + Math.random() * 6,
      Math.sin(a) * r,
    ),
    vel: new THREE.Vector3((Math.random() - 0.5) * 0.4, 0, (Math.random() - 0.5) * 0.4),
    rot: new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6),
    spin: new THREE.Vector3(
      (Math.random() - 0.5) * 3.4,
      (Math.random() - 0.5) * 3.4,
      (Math.random() - 0.5) * 3.4,
    ),
    resting: false,
    active: false,
    delay: i * stagger + Math.random() * 0.12,
    born: 0,
    scale: 0.66 + Math.random() * 0.32,
    landedCounted: false,
  };
}

/** Pre-stacked resting layout so the hero jar can render "already filled". */
function makeRestingStar(index: number, perLayer: number): Star {
  const layer = Math.floor(index / perLayer);
  const withinLayer = index % perLayer;
  const y = JAR.floorY + 0.14 + layer * 0.42;
  const lim = wallLimit(y);
  const angle = withinLayer * ((Math.PI * 2) / perLayer) + layer * 0.9;
  const rad = Math.min(lim, (0.2 + Math.random() * 0.72) * lim);
  const s = makeStar(index, 0);
  s.pos.set(Math.cos(angle) * rad, y, Math.sin(angle) * rad);
  s.resting = true;
  s.active = true;
  s.born = 1;
  s.landedCounted = true;
  s.rot.set(-Math.PI / 2 + (Math.random() - 0.5) * 0.5, Math.random() * 6, (Math.random() - 0.5) * 0.5);
  return s;
}

export function Stars({
  resetKey,
  capacity,
  filled,
  startResting = false,
  stagger = 0.085,
  onLanded,
  onComplete,
}: {
  resetKey: number;
  capacity: number;
  /** how many stars should end up in the jar (0..capacity) */
  filled: number;
  /** hero mode: render the initial `filled` stars already resting */
  startResting?: boolean;
  stagger?: number;
  onLanded?: (n: number) => void;
  onComplete?: () => void;
}) {
  const geo = useMemo(() => createStarGeometry(), []);
  const materials = useMemo(
    () =>
      PALETTE.map(
        (c) =>
          new THREE.MeshStandardMaterial({
            color: new THREE.Color(c),
            emissive: new THREE.Color(c),
            emissiveIntensity: 0.5,
            metalness: 0.65,
            roughness: 0.2,
          }),
      ),
    [],
  );

  const refs = useRef<Array<THREE.Mesh | null>>([]);
  const stars = useRef<Star[]>([]);
  const released = useRef(0); // how many have been released so far
  const landed = useRef(0);
  const completed = useRef(false);

  const build = () => {
    const perLayer = Math.max(6, Math.round((JAR.radius * 1.6) / STAR_R));
    stars.current = Array.from({ length: capacity }, (_, i) => makeStar(i, stagger));
    if (startResting) {
      const n = Math.min(filled, capacity);
      for (let i = 0; i < n; i++) stars.current[i] = makeRestingStar(i, perLayer);
      released.current = n;
      landed.current = n;
    } else {
      released.current = 0;
      landed.current = 0;
    }
    completed.current = false;
    onLanded?.(landed.current);
  };

  useEffect(() => {
    build();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  // When `filled` grows the fixed-timestep step() releases the delta as a pour;
  // no separate effect needed.

  const accumulator = useRef(0);

  const step = (dt: number) => {
    const list = stars.current;
    const target = Math.min(filled, capacity);

    // release new stars up to the target, staggered by their delay
    for (let i = 0; i < list.length; i++) {
      const s = list[i];
      if (!s.active && i < target) {
        s.delay -= dt;
        if (s.delay <= 0) {
          s.active = true;
          s.born = 0;
          released.current++;
        }
      }
    }

    for (let i = 0; i < list.length; i++) {
      const s = list[i];
      const mesh = refs.current[i];
      if (!s || !mesh) continue;

      if (!s.active) {
        mesh.visible = false;
        continue;
      }
      mesh.visible = true;
      s.born += dt;

      if (!s.resting) {
        s.vel.y -= GRAVITY * dt;
        s.pos.addScaledVector(s.vel, dt);
        s.rot.x += s.spin.x * dt;
        s.rot.y += s.spin.y * dt;
        s.rot.z += s.spin.z * dt;

        // glass wall (narrows through shoulder + neck)
        const lim = wallLimit(s.pos.y);
        const d = Math.hypot(s.pos.x, s.pos.z);
        if (d > lim) {
          const nx = s.pos.x / d;
          const nz = s.pos.z / d;
          s.pos.x = nx * lim;
          s.pos.z = nz * lim;
          const vn = s.vel.x * nx + s.vel.z * nz;
          s.vel.x -= 1.4 * vn * nx;
          s.vel.z -= 1.4 * vn * nz;
        }

        // stack on settled stars and spread off the heap
        let support = JAR.floorY + 0.1;
        let slideX = 0;
        let slideZ = 0;
        for (const o of list) {
          if (o === s || !o.resting) continue;
          const dx = s.pos.x - o.pos.x;
          const dz = s.pos.z - o.pos.z;
          const d2 = dx * dx + dz * dz;
          if (d2 < STAR_R * STAR_R * 2.3) {
            support = Math.max(support, o.pos.y + 0.17);
            const len = Math.sqrt(d2) || 0.001;
            slideX += dx / len;
            slideZ += dz / len;
          }
        }
        if (support > JAR.floorY + 0.13) {
          s.vel.x += (slideX * 1.2 + (Math.random() - 0.5) * 0.5) * dt * 6;
          s.vel.z += (slideZ * 1.2 + (Math.random() - 0.5) * 0.5) * dt * 6;
        }

        if (s.pos.y <= support) {
          s.pos.y = support;
          if (Math.abs(s.vel.y) > 2.2) {
            s.vel.y *= -0.26; // soft bounce
            s.vel.x += (Math.random() - 0.5) * 1.8;
            s.vel.z += (Math.random() - 0.5) * 1.8;
            s.spin.multiplyScalar(0.55);
          } else {
            s.resting = true;
            s.vel.set(0, 0, 0);
            s.rot.x = -Math.PI / 2 + (Math.random() - 0.5) * 0.45;
            s.rot.z = (Math.random() - 0.5) * 0.45;
            if (!s.landedCounted) {
              s.landedCounted = true;
              landed.current += 1;
              onLanded?.(landed.current);
            }
          }
        }

        const damp = Math.exp(-1.3 * dt);
        s.vel.x *= damp;
        s.vel.z *= damp;
      } else {
        s.rot.y += 0.18 * dt; // gentle idle shimmer-turn
      }

      // graceful scale-in on release
      const grow = Math.min(1, s.born / 0.26);
      const eased = 1 - Math.pow(1 - grow, 3);
      mesh.position.copy(s.pos);
      mesh.rotation.copy(s.rot);
      mesh.scale.setScalar(s.scale * eased);
    }

    if (
      !completed.current &&
      target > 0 &&
      released.current >= target &&
      landed.current >= target
    ) {
      completed.current = true;
      onComplete?.();
    }
  };

  // Fixed-timestep so the pour keeps a steady pace on any device.
  useFrame((_, rawDelta) => {
    accumulator.current = Math.min(accumulator.current + rawDelta, 0.5);
    const h = 1 / 60;
    let guard = 40;
    while (accumulator.current >= h && guard-- > 0) {
      accumulator.current -= h;
      step(h);
    }
  });

  return (
    <>
      {Array.from({ length: capacity }, (_, i) => (
        <mesh
          key={i}
          ref={(r) => {
            refs.current[i] = r;
          }}
          geometry={geo}
          material={materials[i % materials.length]!}
          visible={false}
          castShadow
        />
      ))}
    </>
  );
}
