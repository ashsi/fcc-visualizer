import type { ThemeMode } from "../types";
import type { Theme } from "./types";
import { textbookTheme } from "./textbook";

const themes: Record<ThemeMode, Theme> = {
  textbook: textbookTheme,
  lab80s: textbookTheme, // placeholder until phase 2
};

export const getTheme = (mode: ThemeMode): Theme => themes[mode];

export { textbookTheme };
