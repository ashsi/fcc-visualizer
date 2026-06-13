import type { ThemeMode } from "../types";
import type { Theme } from "./types";
import { lab80sTheme } from "./lab80s";
import { textbookTheme } from "./textbook";

const themes: Record<ThemeMode, Theme> = {
  textbook: textbookTheme,
  lab80s: lab80sTheme,
};

export const THEME_OPTIONS: { value: ThemeMode; label: string }[] = [
  { value: "textbook", label: "Textbook" },
  { value: "lab80s", label: "1980s Lab" },
];

export const getTheme = (mode: ThemeMode): Theme => themes[mode];

export { lab80sTheme, textbookTheme };
