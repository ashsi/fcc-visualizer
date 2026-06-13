import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BufferAttribute,
  BufferGeometry,
  LineBasicMaterial,
} from "three";
import type { BondSegment } from "../lattice/bonds";

type LineSegmentsProps = {
  segments: BondSegment[];
  color: string;
  opacity: number;
  pulse: boolean;
};

function segmentsToGeometry(segments: BondSegment[]): BufferGeometry {
  const positions = new Float32Array(segments.length * 6);

  segments.forEach((segment, index) => {
    const offset = index * 6;
    positions[offset] = segment.start[0];
    positions[offset + 1] = segment.start[1];
    positions[offset + 2] = segment.start[2];
    positions[offset + 3] = segment.end[0];
    positions[offset + 4] = segment.end[1];
    positions[offset + 5] = segment.end[2];
  });

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  return geometry;
}

function GlowLines({ segments, color, opacity, pulse }: LineSegmentsProps) {
  const materialRef = useRef<LineBasicMaterial>(null);
  const geometry = useMemo(
    () => segmentsToGeometry(segments),
    [segments],
  );

  useFrame(({ clock }) => {
    if (!pulse || !materialRef.current) {
      return;
    }

    materialRef.current.opacity =
      opacity * (0.75 + 0.25 * Math.sin(clock.elapsedTime * 2));
  });

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial
        ref={materialRef}
        color={color}
        transparent
        opacity={opacity}
      />
    </lineSegments>
  );
}

type BondsProps = {
  segments: BondSegment[];
  color: string;
  pulse: boolean;
};

export function Bonds({ segments, color, pulse }: BondsProps) {
  if (segments.length === 0) {
    return null;
  }

  return <GlowLines segments={segments} color={color} opacity={0.55} pulse={pulse} />;
}

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
