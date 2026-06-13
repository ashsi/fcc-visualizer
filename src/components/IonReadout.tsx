import type { CSSProperties } from "react";
import type { Theme } from "../themes/types";

type IonReadoutProps = {
  ion: string | null;
  theme: Theme;
};

const readoutStyle: CSSProperties = {
  position: "absolute",
  top: 20,
  right: 40,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  color: "white",
  padding: "10px",
  borderRadius: "5px",
  zIndex: 10,
};

export function IonReadout({ ion, theme }: IonReadoutProps) {
  if (!ion) {
    return null;
  }

  return (
    <div style={readoutStyle}>
      {theme.ui.readoutLabel} {ion}
    </div>
  );
}
