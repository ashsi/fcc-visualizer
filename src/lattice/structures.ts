import type { AtomSpec, StructureType } from "../types";
import { FCC_POINTS, INTERWEAVING_POINTS } from "./constants";

export function getAtomsForStructure(type: StructureType): AtomSpec[] {
  if (type === "Cu") {
    return FCC_POINTS.map((position) => ({
      position,
      ion: "Cu",
      label: "Cu",
      size: 0.2,
    }));
  }

  const isNaCl = type === "NaCl";
  const ionA = isNaCl ? "Cl" : "O";
  const ionB = isNaCl ? "Na" : "Mg";
  const labelA = isNaCl ? "Cl⁻" : "O²⁻";
  const labelB = isNaCl ? "Na⁺" : "Mg²⁺";

  const atoms: AtomSpec[] = FCC_POINTS.map((position) => ({
    position,
    ion: ionA,
    label: labelA,
    size: 0.2,
  }));

  INTERWEAVING_POINTS.forEach((position) => {
    atoms.push({
      position,
      ion: ionB,
      label: labelB,
      size: 0.1,
    });
  });

  return atoms;
}
