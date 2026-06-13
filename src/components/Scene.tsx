import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import type { StructureType } from "../types";
import type { Theme } from "../themes/types";
import { FCCStructure } from "./FCCStructure";

type SceneProps = {
  structure: StructureType;
  theme: Theme;
  onSelect: (ion: string) => void;
};

export function Scene({ structure, theme, onSelect }: SceneProps) {
  return (
    <>
      <color attach="background" args={[theme.scene.background]} />
      <ambientLight intensity={theme.scene.ambientIntensity} />
      <pointLight
        position={theme.scene.pointLight.position}
        intensity={theme.scene.pointLight.intensity}
      />
      <Suspense fallback={null}>
        <FCCStructure type={structure} theme={theme} onSelect={onSelect} />
      </Suspense>
      <OrbitControls />
    </>
  );
}
