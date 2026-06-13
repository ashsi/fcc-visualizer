import type { IonKey } from "../types";

export type IonStyle = {
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
};

export type Theme = {
  id: "textbook" | "lab80s";
  label: string;
  ions: Record<IonKey, IonStyle>;
  scene: {
    background: string;
    ambientIntensity: number;
    pointLight: { position: [number, number, number]; intensity: number };
  };
  atom: {
    material: "standard" | "emissive";
    showHalo: boolean;
    pulse: boolean;
  };
  ui: {
    rootClass: string;
    readoutLabel: string;
  };
  effects: {
    bloom: boolean;
    scanlines: boolean;
    bonds: boolean;
    unitCellWireframe: boolean;
  };
};
