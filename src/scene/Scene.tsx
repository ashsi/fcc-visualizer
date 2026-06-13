import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import type { StructureType, Theme } from "../domain/types";
import { LabEffects } from "./LabEffects";
import { LatticeView } from "./LatticeView";
import { ViewerProvider } from "./ViewerContext";

type SceneProps = {
  structure: StructureType;
  theme: Theme;
  bloomLevel: number;
  selectedIon: string | null;
  setShowIonHint: (show: boolean) => void;
  onSelect: (ion: string) => void;
};

export function Scene({
  structure,
  theme,
  bloomLevel,
  selectedIon,
  setShowIonHint,
  onSelect,
}: SceneProps) {
  return (
    <ViewerProvider
      value={{
        theme,
        bloomLevel,
        selectedIon,
        setShowIonHint,
        onSelect,
      }}
    >
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
        <LatticeView type={structure} />
      </Suspense>
      <LabEffects />
      <OrbitControls />
    </ViewerProvider>
  );
}
