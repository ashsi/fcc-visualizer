import type { CSSProperties } from "react";
import type { StructureType } from "../types";

type ControlsProps = {
  structure: StructureType;
  onStructureChange: (structure: StructureType) => void;
};

const controlStyle: CSSProperties = {
  position: "absolute",
  top: 20,
  left: 40,
  padding: 10,
  zIndex: 10,
  pointerEvents: "auto",
};

export function Controls({ structure, onStructureChange }: ControlsProps) {
  return (
    <select
      style={controlStyle}
      value={structure}
      onChange={(e) => {
        onStructureChange(e.target.value as StructureType);
      }}
    >
      <option value="Cu">Copper (FCC)</option>
      <option value="NaCl">Sodium Chloride (Rock Salt)</option>
      <option value="MgO">Magnesium Oxide (Rock Salt)</option>
    </select>
  );
}
