"use client";

import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  OrbitControls,
  Sparkles,
} from "@react-three/drei";
import { Suspense } from "react";
import { Jar, JAR } from "./Jar";
import { Stars } from "./Stars";

export function StarJarCanvas({
  variant,
  resetKey,
  capacity,
  filled,
  startResting = false,
  onLanded,
  onComplete,
}: {
  variant: "intro" | "hero";
  resetKey: number;
  capacity: number;
  filled: number;
  startResting?: boolean;
  onLanded?: (n: number) => void;
  onComplete?: () => void;
}) {
  const isIntro = variant === "intro";

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: isIntro ? [0, 4.4, 15] : [0, 3.6, 14], fov: 42 }}
    >
      {isIntro && <fog attach="fog" args={["#efe6d2", 24, 52]} />}

      <ambientLight intensity={0.55} />
      <directionalLight
        position={[6, 13, 8]}
        intensity={2.1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[0, 1.2, 0]} intensity={12} distance={10} color="#ffcf7a" />
      <pointLight position={[-7, 5, -5]} intensity={6} distance={22} color="#cbb98a" />

      <Suspense fallback={null}>
        <Environment>
          <Lightformer intensity={2.2} position={[0, 9, 0]} scale={[14, 14, 1]} />
          <Lightformer
            intensity={1.1}
            color="#fff2cf"
            position={[-6, 3, -2]}
            rotation-y={Math.PI / 2}
            scale={[22, 2, 1]}
          />
          <Lightformer
            intensity={1}
            color="#ffcf8a"
            position={[6, 3, 2]}
            rotation-y={-Math.PI / 2}
            scale={[22, 2, 1]}
          />
        </Environment>
      </Suspense>

      <group position={[0, -JAR.height * 0.62, 0]}>
        <Jar />
        <Stars
          resetKey={resetKey}
          capacity={capacity}
          filled={filled}
          startResting={startResting}
          stagger={isIntro ? 0.075 : 0.09}
          onLanded={onLanded}
          onComplete={onComplete}
        />
      </group>

      <Sparkles
        count={isIntro ? 60 : 30}
        scale={[16, 12, 16]}
        size={2.4}
        speed={0.28}
        color="#ffe9b8"
      />

      <OrbitControls
        enablePan={false}
        enableZoom={!isIntro}
        minDistance={8}
        maxDistance={20}
        maxPolarAngle={Math.PI / 1.95}
        autoRotate
        autoRotateSpeed={isIntro ? 0.6 : 0.9}
      />
    </Canvas>
  );
}
