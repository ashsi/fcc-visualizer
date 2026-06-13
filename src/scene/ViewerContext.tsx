import { createContext, useContext, type ReactNode } from "react";
import type { Theme } from "../domain/types";

type ViewerContextValue = {
  theme: Theme;
  bloomLevel: number;
  selectedIon: string | null;
  setShowIonHint: (show: boolean) => void;
  onSelect: (ion: string) => void;
};

const ViewerContext = createContext<ViewerContextValue | null>(null);

type ViewerProviderProps = {
  value: ViewerContextValue;
  children: ReactNode;
};

export function ViewerProvider({ value, children }: ViewerProviderProps) {
  return (
    <ViewerContext.Provider value={value}>{children}</ViewerContext.Provider>
  );
}

export function useViewer(): ViewerContextValue {
  const context = useContext(ViewerContext);
  if (!context) {
    throw new Error("useViewer must be used within ViewerProvider");
  }
  return context;
}
