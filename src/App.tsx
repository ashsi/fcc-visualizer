import React from "react";
import { Canvas } from "@react-three/fiber";
import { CrtOverlay } from "./components/CrtOverlay";
import { Controls } from "./components/Controls";
import { IonReadout } from "./components/IonReadout";
import { Scene } from "./components/Scene";
import { ThemeToggle } from "./components/ThemeToggle";
import { getTheme } from "./themes";
import type { StructureType, ThemeMode } from "./types";

const THEME_STORAGE_KEY = "fcc-visualizer-theme";

function getInitialThemeMode(): ThemeMode {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "textbook" || stored === "lab80s") {
    return stored;
  }
  return "textbook";
}

const App = () => {
  const [structure, setStructure] = React.useState<StructureType>("Cu");
  const [themeMode, setThemeMode] =
    React.useState<ThemeMode>(getInitialThemeMode);
  const [selectedIon, setSelectedIon] = React.useState<string | null>(null);
  const theme = getTheme(themeMode);

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
      <ThemeToggle
        themeMode={themeMode}
        onThemeChange={(nextThemeMode) => {
          setThemeMode(nextThemeMode);
          localStorage.setItem(THEME_STORAGE_KEY, nextThemeMode);
        }}
      />
      <IonReadout ion={selectedIon} theme={theme} />
      {theme.effects.scanlines && <CrtOverlay />}

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
