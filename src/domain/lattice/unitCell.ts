import type { BondSegment } from "./bonds";
import { UNIT_CELL_SIZE } from "./constants";

export function getUnitCellEdges(): BondSegment[] {
  const s = UNIT_CELL_SIZE;
  const corners: [number, number, number][] = [
    [0, 0, 0],
    [s, 0, 0],
    [0, s, 0],
    [0, 0, s],
    [s, s, 0],
    [s, 0, s],
    [0, s, s],
    [s, s, s],
  ];

  const edgePairs: [number, number][] = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 4],
    [1, 5],
    [2, 4],
    [2, 6],
    [3, 5],
    [3, 6],
    [4, 7],
    [5, 7],
    [6, 7],
  ];

  return edgePairs.map(([startIndex, endIndex]) => ({
    start: corners[startIndex],
    end: corners[endIndex],
  }));
}
