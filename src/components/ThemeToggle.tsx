import type { ThemeMode } from "../types";
import { THEME_OPTIONS } from "../themes";

type ThemeToggleProps = {
  themeMode: ThemeMode;
  onThemeChange: (themeMode: ThemeMode) => void;
};

export function ThemeToggle({ themeMode, onThemeChange }: ThemeToggleProps) {
  const [textbookOption, labOption] = THEME_OPTIONS;
  const isLab = themeMode === "lab80s";

  return (
    <div className="theme-toggle">
      <span
        className={`theme-toggle__label ${!isLab ? "theme-toggle__label--active" : ""}`}
      >
        {textbookOption.label}
      </span>
      <input
        type="range"
        className="theme-toggle__slider"
        min={0}
        max={1}
        step={1}
        value={isLab ? 1 : 0}
        onChange={(e) => {
          onThemeChange(e.target.value === "1" ? "lab80s" : "textbook");
        }}
        aria-label="Display theme"
      />
      <span
        className={`theme-toggle__label ${isLab ? "theme-toggle__label--active" : ""}`}
      >
        {labOption.label}
      </span>
    </div>
  );
}
