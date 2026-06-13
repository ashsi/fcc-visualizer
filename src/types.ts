export type StructureType = "Cu" | "NaCl" | "MgO";
export type ThemeMode = "textbook" | "lab80s";
export type IonKey = "Cu" | "Na" | "Cl" | "Mg" | "O";

export type AtomSpec = {
  position: [number, number, number];
  ion: IonKey;
  label: string;
  size: number;
};
