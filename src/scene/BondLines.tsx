import type { BondSegment } from "../domain/lattice/bonds";
import { GlowLines } from "./GlowLines";

type BondLinesProps = {
  segments: BondSegment[];
  color: string;
  pulse: boolean;
};

export function BondLines({ segments, color, pulse }: BondLinesProps) {
  if (segments.length === 0) {
    return null;
  }

  return (
    <GlowLines segments={segments} color={color} opacity={0.55} pulse={pulse} />
  );
}
