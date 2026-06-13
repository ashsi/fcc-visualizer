import type { AtomSpec } from "../types";
import type { Theme } from "../themes/types";

type AtomProps = {
  spec: AtomSpec;
  theme: Theme;
  onClick: () => void;
};

export function Atom({ spec, theme, onClick }: AtomProps) {
  const ionStyle = theme.ions[spec.ion];

  return (
    <mesh position={spec.position} onClick={onClick}>
      <sphereGeometry args={[spec.size, 32, 32]} />
      {theme.atom.material === "emissive" ? (
        <meshStandardMaterial
          color={ionStyle.color}
          emissive={ionStyle.emissive ?? ionStyle.color}
          emissiveIntensity={ionStyle.emissiveIntensity ?? 1}
        />
      ) : (
        <meshStandardMaterial color={ionStyle.color} />
      )}
    </mesh>
  );
}
