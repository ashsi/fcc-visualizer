import type { StructureType } from "../domain/types";

type ControlsProps = {
  structure: StructureType;
  onStructureChange: (structure: StructureType) => void;
};

export function Controls({ structure, onStructureChange }: ControlsProps) {
  return (
    <div className="controls">
      <label className="controls__field">
        <span className="controls__label">Structure</span>
        <select
          className="controls__select"
          value={structure}
          onChange={(e) => {
            onStructureChange(e.target.value as StructureType);
          }}
        >
          <option value="Cu">Copper (FCC)</option>
          <option value="NaCl">Sodium Chloride (Rock Salt)</option>
          <option value="MgO">Magnesium Oxide (Rock Salt)</option>
        </select>
      </label>
    </div>
  );
}
