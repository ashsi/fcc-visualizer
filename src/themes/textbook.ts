import type { Theme } from "./types";

export const textbookTheme: Theme = {
  id: "textbook",
  label: "Textbook",
  ions: {
    Cu: { color: "orange" },
    Na: { color: "grey" },
    Cl: { color: "lightblue" },
    Mg: { color: "red" },
    O: { color: "white" },
  },
  scene: {
    background: "#ffffff",
    ambientIntensity: 0.5,
    pointLight: { position: [5, 5, 5], intensity: 1 },
  },
  atom: {
    material: "standard",
    showHalo: false,
    pulse: false,
  },
  ui: {
    rootClass: "theme-textbook",
    readoutLabel: "Selected Ion:",
  },
  effects: {
    bloom: false,
    scanlines: false,
    bonds: false,
    unitCellWireframe: false,
    bondColor: "#888888",
    wireframeColor: "#cccccc",
    bondPulse: false,
  },
};
