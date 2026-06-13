import type { BondSegment } from "../domain/lattice/bonds";
import { GlowLines } from "./GlowLines";

type UnitCellOutlineProps = {
  segments: BondSegment[];
  color: string;
  pulse: boolean;
};

export function UnitCellOutline({
  segments,
  color,
  pulse,
}: UnitCellOutlineProps) {
  return (
    <GlowLines segments={segments} color={color} opacity={0.35} pulse={pulse} />
  );
}
