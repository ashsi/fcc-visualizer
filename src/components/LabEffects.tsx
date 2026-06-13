import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { getBloomSettings } from "../bloom";

type LabEffectsProps = {
  bloomLevel: number;
};

export function LabEffects({ bloomLevel }: LabEffectsProps) {
  const bloom = getBloomSettings(bloomLevel);

  if (!bloom.enabled) {
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
