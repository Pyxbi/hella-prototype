import { useEffect, useRef } from "react";
import * as THREE from "three";

/** Opaque paper sleeve: the back of the label also hides stars behind it. */
export function JarLabel3D({ radius }: { radius: number }) {
  const material = useRef<THREE.MeshStandardMaterial>(null);

  useEffect(() => {
    let active = true;
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 512;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    if (material.current) {
      material.current.map = texture;
      material.current.emissiveMap = texture;
      material.current.needsUpdate = true;
    }
    const ctx = canvas.getContext("2d")!;
    const draw = () => {
      ctx.fillStyle = "#f6f1e7";
      ctx.fillRect(0, 0, 2048, 512);
      ctx.fillStyle = "#698269";
      ctx.fillRect(0, 16, 2048, 3);
      ctx.fillRect(0, 493, 2048, 3);
      ctx.textAlign = "center";
      ctx.fillStyle = "#000000";
      ctx.font = '118px BeautiqueDisplay, Georgia, serif';
      ctx.fillText("hella", 1024, 160);
      ctx.font = 'italic 32px BeautiqueDisplay, Georgia, serif';
      ctx.fillText("beauty", 1105, 202);
      ctx.fillStyle = "#698269";
      ctx.font = '80px BeautiqueDisplay, Georgia, serif';
      ctx.fillText("HER Stars", 1024, 330);
      ctx.font = '28px BeautiqueDisplay, Georgia, serif';
      ctx.fillText("✦", 1024, 383);
      ctx.fillStyle = "#000000";
      ctx.font = '16px "Helvetica Neue", Helvetica, Arial, sans-serif';
      ctx.fillText("B E A U T Y   F U E L S   B R I G H T E R   W O M E N", 1024, 435);
      ctx.fillStyle = "#698269";
      ctx.font = '34px BeautiqueDisplay, Georgia, serif';
      [300, 600, 1448, 1748].forEach((x, i) => {
        ctx.fillText("✦", x, 145 + (i % 2) * 70);
        ctx.fillText("✧", x + 50, 360 - (i % 2) * 60);
      });
      texture.needsUpdate = true;
    };
    draw();
    void document.fonts.load("80px BeautiqueDisplay").then(() => {
      if (active) draw();
    });
    return () => {
      active = false;
      texture.dispose();
    };
  }, []);

  return (
    <mesh position={[0, 2.15, 0]}>
      {/* Match the slight taper of the jar body; seam sits at the back. */}
      <cylinderGeometry args={[radius + 0.018, radius * 0.985 + 0.018, 2.05, 128, 1, true, Math.PI]} />
      <meshStandardMaterial ref={material} roughness={0.85} emissive="#ffffff" emissiveIntensity={0.3} side={THREE.DoubleSide} />
    </mesh>
  );
}
