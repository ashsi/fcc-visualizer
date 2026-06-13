import type { Theme } from "../types";

export const lab80sTheme: Theme = {
  id: "lab80s",
  label: "1980s Lab",
  ions: {
    Cu: { color: "#ffb000", emissive: "#ff8800", emissiveIntensity: 2 },
    Na: { color: "#00ffff", emissive: "#00cccc", emissiveIntensity: 1.5 },
    Cl: { color: "#cc66ff", emissive: "#9933ff", emissiveIntensity: 1.5 },
    Mg: { color: "#ff6699", emissive: "#ff3366", emissiveIntensity: 1.5 },
    O: { color: "#aaddff", emissive: "#66ccff", emissiveIntensity: 2 },
  },
  scene: {
    background: "#0a0a12",
    ambientIntensity: 0.1,
    pointLight: { position: [3, 5, 2], intensity: 0.3 },
    fog: { color: "#0a0a12", near: 8, far: 20 },
  },
  atom: {
    material: "emissive",
    showHalo: true,
    pulse: true,
  },
  ui: {
    rootClass: "theme-lab80s",
    readoutLabel: "ION LOCKED:",
  },
  effects: {
    bloom: true,
    scanlines: true,
    bonds: true,
    unitCellWireframe: true,
    bondColor: "#00ffff",
    wireframeColor: "#cc66ff",
    bondPulse: true,
  },
};
