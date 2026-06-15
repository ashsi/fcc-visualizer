import { useEffect, useState } from "react";

type IonCursorHintProps = {
  visible: boolean;
  themeClass: string;
};

export function IonCursorHint({ visible, themeClass }: IonCursorHintProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!visible) {
      return;
    }

    const onMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
    };
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <span
      className={`ion-cursor-hint ion-cursor-hint--${themeClass}`}
      style={{
        left: position.x + 14,
        top: position.y + 2,
      }}
      aria-hidden="true"
    >
      ?
    </span>
  );
}
