import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Atom Component
const Atom = ({ position, color, size, type, onClick }: { position: [number, number, number]; color: string; size: number; type: string; onClick: () => void;}) => {
  return (
    <mesh position={position} onClick={onClick}> 
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// FCC Unit Cell Generator
const FCCStructure = ({ type, onSelect }: { type: "Cu" | "NaCl" | "MgO"; onSelect: (ion: string) => void }) => {
  const unitCellSize = 1.5;
  const colors = { Cu: "orange", Na: "grey", Cl: "lightblue", Mg: "red", O: "white" };

  // FCC Lattice Points
  const fccPoints: [number, number, number][] = [
    [0, 0, 0], [unitCellSize, 0, 0], [0, unitCellSize, 0], [0, 0, unitCellSize],
    [unitCellSize, unitCellSize, 0], [unitCellSize, 0, unitCellSize], [0, unitCellSize, unitCellSize],
    [unitCellSize, unitCellSize, unitCellSize], [unitCellSize / 2, unitCellSize / 2, 0],
    [unitCellSize / 2, 0, unitCellSize / 2], [0, unitCellSize / 2, unitCellSize / 2], [unitCellSize / 2, unitCellSize, unitCellSize / 2],
    [unitCellSize / 2, unitCellSize / 2, unitCellSize], [unitCellSize, unitCellSize / 2, unitCellSize / 2]
  ];

  // Interweaving Offsets
  const interweavingPoints: [number, number, number][] = [
    [unitCellSize / 2, 0, 0], [unitCellSize, unitCellSize / 2, 0], [0, unitCellSize / 2, 0], [unitCellSize / 2, unitCellSize, 0],
    [unitCellSize, 0, unitCellSize / 2], [0, 0, unitCellSize / 2], [0, unitCellSize, unitCellSize / 2], [unitCellSize, unitCellSize, unitCellSize / 2], [ unitCellSize / 2, unitCellSize / 2, unitCellSize / 2],
    [unitCellSize / 2, 0, unitCellSize], [unitCellSize, unitCellSize / 2, unitCellSize], [0, unitCellSize / 2, unitCellSize], [unitCellSize / 2, unitCellSize, unitCellSize]
  ];

  let atoms: JSX.Element[] = [];
  if (type === "Cu") {
    atoms = fccPoints.map((pos, i) => <Atom key={i} position={pos} color={colors.Cu} size={0.2} type="Cu" onClick={() => onSelect("Cu")} />);
  } else if (type === "NaCl" || type === "MgO") {
    const ionA = type === "NaCl" ? colors.Cl : colors.O;
    const ionB = type === "NaCl" ? colors.Na : colors.Mg;
    const ionAType = type === "NaCl" ? "Cl⁻" : "O²⁻";
    const ionBType = type === "NaCl" ? "Na⁺" : "Mg²⁺";

    // Interweaving Lattice
    fccPoints.forEach((pos, i) => {
      atoms.push(<Atom key={`A-${i}`} position={pos} color={ionA} size={0.2} type={ionAType} onClick={() => onSelect(ionAType)} />);
    });

    interweavingPoints.forEach((pos, i) => {
      atoms.push(<Atom key={`B-${i}`} position={pos} color={ionB} size={0.1} type={ionBType} onClick={() => onSelect(ionBType)} />);
    });
  }

  return <>{atoms}</>;
};


const App = () => {
  const [structure, setStructure] = React.useState<"Cu" | "NaCl" | "MgO">("Cu");
  const [selectedIon, setSelectedIon] = React.useState<string | null>(null);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <select
        style={{
          position: "absolute",
          top: 20,
          left: 40,
          padding: 10,
          zIndex: 10,
          pointerEvents: "auto",
        }}
        onChange={(e) => {
          setStructure(e.target.value as "Cu" | "NaCl" | "MgO");
          setSelectedIon(null); // Reset selected ion when changing structure
        }}
      >
        <option value="Cu">Copper (FCC)</option>
        <option value="NaCl">Sodium Chloride (Rock Salt)</option>
        <option value="MgO">Magnesium Oxide (Rock Salt)</option>
      </select>

      {/* Show selected ion */}
      {selectedIon && (
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 40,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            zIndex: 10,
          }}
        >
          Selected Ion: {selectedIon}
        </div>
      )}

      <Canvas eventSource={document.body}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <FCCStructure type={structure} onSelect={setSelectedIon} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default App;
