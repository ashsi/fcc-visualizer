import { useMemo } from "react";
import { getBondSegments } from "../domain/lattice/bonds";
import { LATTICE_CENTER_OFFSET } from "../domain/lattice/constants";
import { getAtomsForStructure } from "../domain/lattice/structures";
import { getUnitCellEdges } from "../domain/lattice/unitCell";
import type { StructureType } from "../domain/types";
import { BondLines } from "./BondLines";
import { LatticeAtom } from "./LatticeAtom";
import { UnitCellOutline } from "./UnitCellOutline";
import { useViewer } from "./ViewerContext";

type LatticeViewProps = {
  type: StructureType;
};

export function LatticeView({ type }: LatticeViewProps) {
  const { theme, setShowIonHint } = useViewer();
  const atoms = useMemo(() => getAtomsForStructure(type), [type]);
  const bondSegments = useMemo(
    () => (theme.effects.bonds ? getBondSegments(type, atoms) : []),
    [type, atoms, theme.effects.bonds],
  );
  const unitCellEdges = useMemo(() => getUnitCellEdges(), []);

  return (
    <group position={LATTICE_CENTER_OFFSET} onPointerMissed={() => setShowIonHint(false)}>
      {theme.effects.unitCellWireframe && (
        <UnitCellOutline
          segments={unitCellEdges}
          color={theme.effects.wireframeColor}
          pulse={theme.effects.bondPulse}
        />
      )}
      {theme.effects.bonds && (
        <BondLines
          segments={bondSegments}
          color={theme.effects.bondColor}
          pulse={theme.effects.bondPulse}
        />
      )}
      {atoms.map((spec, i) => (
        <LatticeAtom key={i} spec={spec} />
      ))}
    </group>
  );
}
