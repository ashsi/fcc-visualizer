import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { MeshStandardMaterial } from "three";
import type { AtomSpec } from "../types";
import type { Theme } from "../themes/types";

type AtomProps = {
  spec: AtomSpec;
  theme: Theme;
  onClick: () => void;
};

const HALO_SCALE = 1.6;

export function Atom({ spec, theme, onClick }: AtomProps) {
  const ionStyle = theme.ions[spec.ion];
  const materialRef = useRef<MeshStandardMaterial>(null);
  const isEmissive = theme.atom.material === "emissive";

  useFrame(({ clock }) => {
    if (!theme.atom.pulse || !materialRef.current || !isEmissive) {
      return;
    }

    const base = ionStyle.emissiveIntensity ?? 1;
    materialRef.current.emissiveIntensity =
      base * (0.85 + 0.15 * Math.sin(clock.elapsedTime * 3));
  });

  return (
    <group position={spec.position}>
      <mesh onClick={onClick}>
        <sphereGeometry args={[spec.size, 32, 32]} />
        <meshStandardMaterial
          ref={materialRef}
          color={ionStyle.color}
          emissive={isEmissive ? (ionStyle.emissive ?? ionStyle.color) : "#000000"}
          emissiveIntensity={
            isEmissive ? (ionStyle.emissiveIntensity ?? 1) : 0
          }
        />
      </mesh>
      {theme.atom.showHalo && (
        <mesh scale={HALO_SCALE}>
          <sphereGeometry args={[spec.size, 16, 16]} />
          <meshBasicMaterial
            color={ionStyle.emissive ?? ionStyle.color}
            transparent
            opacity={0.12}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}
