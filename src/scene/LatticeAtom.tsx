import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { MeshStandardMaterial } from "three";
import { getBloomSettings } from "../domain/bloom";
import type { AtomSpec } from "../domain/types";
import { useViewer } from "./ViewerContext";

type LatticeAtomProps = {
  spec: AtomSpec;
};

const HALO_SCALE = 1.6;

export function LatticeAtom({ spec }: LatticeAtomProps) {
  const { theme, bloomLevel, onSelect } = useViewer();
  const ionStyle = theme.ions[spec.ion];
  const materialRef = useRef<MeshStandardMaterial>(null);
  const isEmissive = theme.atom.material === "emissive";
  const bloom = getBloomSettings(bloomLevel);
  const baseIntensity = ionStyle.emissiveIntensity ?? 1;

  useFrame(({ clock }) => {
    if (!theme.atom.pulse || !materialRef.current || !isEmissive) {
      return;
    }

    const intensity = baseIntensity * bloom.emissiveScale;
    materialRef.current.emissiveIntensity =
      intensity * (0.85 + 0.15 * Math.sin(clock.elapsedTime * 3));
  });

  const emissiveIntensity = isEmissive
    ? baseIntensity * bloom.emissiveScale
    : 0;

  return (
    <group position={spec.position}>
      <mesh onClick={() => onSelect(spec.label)}>
        <sphereGeometry args={[spec.size, 32, 32]} />
        <meshStandardMaterial
          ref={materialRef}
          color={
            isEmissive && bloom.emissiveOnly ? "#000000" : ionStyle.color
          }
          emissive={isEmissive ? (ionStyle.emissive ?? ionStyle.color) : "#000000"}
          emissiveIntensity={emissiveIntensity}
          toneMapped={!(isEmissive && bloom.enabled)}
        />
      </mesh>
      {theme.atom.showHalo && bloom.haloOpacity > 0.01 && (
        <mesh scale={HALO_SCALE}>
          <sphereGeometry args={[spec.size, 16, 16]} />
          <meshBasicMaterial
            color={ionStyle.emissive ?? ionStyle.color}
            transparent
            opacity={bloom.haloOpacity}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      )}
    </group>
  );
}
