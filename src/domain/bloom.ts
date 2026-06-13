export type BloomSettings = {
  /** Normalized bloom level 0–1 */
  t: number;
  enabled: boolean;
  intensity: number;
  luminanceThreshold: number;
  emissiveScale: number;
  haloOpacity: number;
  emissiveOnly: boolean;
};

export function getBloomSettings(level: number): BloomSettings {
  const t = Math.max(0, Math.min(100, level)) / 100;

  return {
    t,
    enabled: t > 0,
    intensity: t * 2.5,
    luminanceThreshold: 0.9 - t * 0.75,
    emissiveScale: 1 + t * 2,
    haloOpacity: 0.12 * (1 - t),
    emissiveOnly: t >= 0.25,
  };
}
