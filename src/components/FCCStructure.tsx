import { getAtomsForStructure } from "../lattice/structures";
import type { StructureType } from "../types";
import type { Theme } from "../themes/types";
import { Atom } from "./Atom";

type FCCStructureProps = {
  type: StructureType;
  theme: Theme;
  onSelect: (ion: string) => void;
};

export function FCCStructure({ type, theme, onSelect }: FCCStructureProps) {
  const atoms = getAtomsForStructure(type);

  return (
    <>
      {atoms.map((spec, i) => (
        <Atom
          key={i}
          spec={spec}
          theme={theme}
          onClick={() => onSelect(spec.label)}
        />
      ))}
    </>
  );
}
