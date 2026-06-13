export type StructureType = "Cu" | "NaCl" | "MgO";
export type ThemeMode = "textbook" | "lab80s";
export type IonKey = "Cu" | "Na" | "Cl" | "Mg" | "O";

export type AtomSpec = {
  position: [number, number, number];
  ion: IonKey;
  label: string;
  size: number;
};

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
    fog?: { color: string; near: number; far: number };
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
    bondColor: string;
    wireframeColor: string;
    bondPulse: boolean;
  };
};
