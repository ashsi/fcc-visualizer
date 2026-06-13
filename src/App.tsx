import React from "react";
import { Canvas } from "@react-three/fiber";
import { Controls } from "./components/Controls";
import { IonReadout } from "./components/IonReadout";
import { Scene } from "./components/Scene";
import { getTheme } from "./themes";
import type { StructureType } from "./types";

const App = () => {
  const [structure, setStructure] = React.useState<StructureType>("Cu");
  const [selectedIon, setSelectedIon] = React.useState<string | null>(null);
  const theme = getTheme("textbook");

  return (
    <div
      className={theme.ui.rootClass}
      style={{ width: "100vw", height: "100vh" }}
    >
      <Controls
        structure={structure}
        onStructureChange={(nextStructure) => {
          setStructure(nextStructure);
          setSelectedIon(null);
        }}
      />
      <IonReadout ion={selectedIon} theme={theme} />

      <Canvas eventSource={document.body}>
        <Scene
          structure={structure}
          theme={theme}
          onSelect={setSelectedIon}
        />
      </Canvas>
    </div>
  );
};

export default App;
