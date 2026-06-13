import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { getBloomSettings } from "../domain/bloom";
import { useViewer } from "./ViewerContext";

export function LabEffects() {
  const { theme, bloomLevel } = useViewer();
  const bloom = getBloomSettings(bloomLevel);

  if (!theme.effects.bloom || !bloom.enabled) {
    return null;
  }

  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={bloom.intensity}
        luminanceThreshold={bloom.luminanceThreshold}
        luminanceSmoothing={0.4}
        mipmapBlur
      />
    </EffectComposer>
  );
}
