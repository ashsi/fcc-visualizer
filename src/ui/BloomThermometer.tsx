type BloomThermometerProps = {
  bloomLevel: number;
  onBloomChange: (level: number) => void;
};

export function BloomThermometer({
  bloomLevel,
  onBloomChange,
}: BloomThermometerProps) {
  return (
    <div className="bloom-thermometer">
      <span className="bloom-thermometer__label">Bloom</span>
      <div className="bloom-thermometer__gauge">
        <div
          className="bloom-thermometer__fill"
          style={{ height: `${bloomLevel}%` }}
        />
        <input
          type="range"
          className="bloom-thermometer__slider"
          min={0}
          max={100}
          step={1}
          value={bloomLevel}
          onChange={(e) => {
            onBloomChange(Number(e.target.value));
          }}
          aria-label="Bloom intensity"
        />
      </div>
      <span className="bloom-thermometer__value">{bloomLevel}</span>
    </div>
  );
}
