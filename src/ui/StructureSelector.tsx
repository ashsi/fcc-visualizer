import type { StructureType } from "../domain/types";

type StructureSelectorProps = {
  structure: StructureType;
  onStructureChange: (structure: StructureType) => void;
};

export function StructureSelector({
  structure,
  onStructureChange,
}: StructureSelectorProps) {
  return (
    <div className="structure-selector">
      <label className="structure-selector__field">
        <span className="structure-selector__label">Structure</span>
        <select
          className="structure-selector__select"
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
