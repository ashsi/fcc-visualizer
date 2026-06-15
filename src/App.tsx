import React from "react";
import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping, NoToneMapping } from "three";
import { getBloomSettings } from "./domain/bloom";
import { getTheme } from "./domain/themes";
import type { StructureType, ThemeMode } from "./domain/types";
import { usePreventBrowserZoom } from "./hooks/usePreventBrowserZoom";
import { Scene } from "./scene/Scene";
import { BloomThermometer } from "./ui/BloomThermometer";
import { CrtOverlay } from "./ui/CrtOverlay";
import { Controls } from "./ui/Controls";
import { IonCursorHint } from "./ui/IonCursorHint";
import { IonReadout } from "./ui/IonReadout";
import { ThemeToggle } from "./ui/ThemeToggle";

const THEME_STORAGE_KEY = "fcc-visualizer-theme";
const BLOOM_STORAGE_KEY = "fcc-visualizer-bloom";

function getInitialThemeMode(): ThemeMode {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "textbook" || stored === "lab80s") {
    return stored;
  }
  return "textbook";
}

function getInitialBloomLevel(): number {
  const stored = localStorage.getItem(BLOOM_STORAGE_KEY);
  if (!stored) {
    return 0;
  }

  const level = Number(stored);
  if (Number.isFinite(level) && level >= 0 && level <= 100) {
    return level;
  }

  return 0;
}

const App = () => {
  usePreventBrowserZoom();

  const [structure, setStructure] = React.useState<StructureType>("Cu");
  const [themeMode, setThemeMode] =
    React.useState<ThemeMode>(getInitialThemeMode);
  const [bloomLevel, setBloomLevel] = React.useState(getInitialBloomLevel);
  const [selectedIon, setSelectedIon] = React.useState<string | null>(null);
  const [showIonHint, setShowIonHint] = React.useState(false);
  const theme = getTheme(themeMode);
  const bloom = getBloomSettings(bloomLevel);
  const isLab = themeMode === "lab80s";

  return (
    <div
      className={theme.ui.rootClass}
      style={{ width: "100%", height: "100%" }}
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
      {isLab && (
        <BloomThermometer
          bloomLevel={bloomLevel}
          onBloomChange={(level) => {
            setBloomLevel(level);
            localStorage.setItem(BLOOM_STORAGE_KEY, String(level));
          }}
        />
      )}
      <IonReadout ion={selectedIon} theme={theme} />
      <IonCursorHint visible={showIonHint} themeClass={theme.id} />
      {theme.effects.scanlines && <CrtOverlay />}

      <Canvas
        eventSource={document.body}
        gl={{
          toneMapping:
            isLab && bloom.enabled ? NoToneMapping : ACESFilmicToneMapping,
        }}
      >
        <Scene
          structure={structure}
          theme={theme}
          bloomLevel={bloomLevel}
          selectedIon={selectedIon}
          setShowIonHint={setShowIonHint}
          onSelect={setSelectedIon}
        />
      </Canvas>
    </div>
  );
};

export default App;
