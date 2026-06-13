import type { AtomSpec, StructureType } from "../types";
import { UNIT_CELL_SIZE } from "./constants";

export type BondSegment = {
  start: [number, number, number];
  end: [number, number, number];
};

function distance(
  a: [number, number, number],
  b: [number, number, number],
): number {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  const dz = a[2] - b[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

const CU_BOND_MAX = (UNIT_CELL_SIZE / Math.SQRT2) * 1.05;
const IONIC_BOND_MAX = (UNIT_CELL_SIZE / 2) * 1.05;

export function getBondSegments(
  type: StructureType,
  atoms: AtomSpec[],
): BondSegment[] {
  const segments: BondSegment[] = [];

  for (let i = 0; i < atoms.length; i++) {
    for (let j = i + 1; j < atoms.length; j++) {
      const atomA = atoms[i];
      const atomB = atoms[j];
      const separation = distance(atomA.position, atomB.position);

      if (type === "Cu") {
        if (separation <= CU_BOND_MAX) {
          segments.push({ start: atomA.position, end: atomB.position });
        }
        continue;
      }

      if (atomA.ion !== atomB.ion && separation <= IONIC_BOND_MAX) {
        segments.push({ start: atomA.position, end: atomB.position });
      }
    }
  }

  return segments;
}
