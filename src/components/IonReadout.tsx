import type { Theme } from "../themes/types";

type IonReadoutProps = {
  ion: string | null;
  theme: Theme;
};

export function IonReadout({ ion, theme }: IonReadoutProps) {
  if (!ion) {
    return null;
  }

  return (
    <div className="ion-readout">
      {theme.ui.readoutLabel} {ion}
    </div>
  );
}
