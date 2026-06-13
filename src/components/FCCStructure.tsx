import { useMemo } from "react";
import { getBondSegments } from "../lattice/bonds";
import { getAtomsForStructure } from "../lattice/structures";
import { getUnitCellEdges } from "../lattice/unitCell";
import type { StructureType } from "../types";
import type { Theme } from "../themes/types";
import { LatticeAtom } from "./LatticeAtom";
import { Bonds, UnitCellOutline } from "./LatticeLines";

type FCCStructureProps = {
  type: StructureType;
  theme: Theme;
  bloomLevel: number;
  onSelect: (ion: string) => void;
};

export function FCCStructure({
  type,
  theme,
  bloomLevel,
  onSelect,
}: FCCStructureProps) {
  const atoms = useMemo(() => getAtomsForStructure(type), [type]);
  const bondSegments = useMemo(
    () => (theme.effects.bonds ? getBondSegments(type, atoms) : []),
    [type, atoms, theme.effects.bonds],
  );
  const unitCellEdges = useMemo(() => getUnitCellEdges(), []);

  return (
    <>
      {theme.effects.unitCellWireframe && (
        <UnitCellOutline
          segments={unitCellEdges}
          color={theme.effects.wireframeColor}
          pulse={theme.effects.bondPulse}
        />
      )}
      {theme.effects.bonds && (
        <Bonds
          segments={bondSegments}
          color={theme.effects.bondColor}
          pulse={theme.effects.bondPulse}
        />
      )}
      {atoms.map((spec, i) => (
        <LatticeAtom
          key={i}
          spec={spec}
          theme={theme}
          bloomLevel={bloomLevel}
          onClick={() => onSelect(spec.label)}
        />
      ))}
    </>
  );
}
