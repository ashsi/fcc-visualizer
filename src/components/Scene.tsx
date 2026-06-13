import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import type { StructureType } from "../types";
import type { Theme } from "../themes/types";
import { FCCStructure } from "./FCCStructure";
import { LabEffects } from "./LabEffects";

type SceneProps = {
  structure: StructureType;
  theme: Theme;
  bloomLevel: number;
  onSelect: (ion: string) => void;
};

export function Scene({ structure, theme, bloomLevel, onSelect }: SceneProps) {
  return (
    <>
      <color attach="background" args={[theme.scene.background]} />
      {theme.scene.fog && (
        <fog
          attach="fog"
          args={[
            theme.scene.fog.color,
            theme.scene.fog.near,
            theme.scene.fog.far,
          ]}
        />
      )}
      <ambientLight intensity={theme.scene.ambientIntensity} />
      <pointLight
        position={theme.scene.pointLight.position}
        intensity={theme.scene.pointLight.intensity}
      />
      <Suspense fallback={null}>
        <FCCStructure
          type={structure}
          theme={theme}
          bloomLevel={bloomLevel}
          onSelect={onSelect}
        />
      </Suspense>
      {theme.effects.bloom && <LabEffects bloomLevel={bloomLevel} />}
      <OrbitControls />
    </>
  );
}
