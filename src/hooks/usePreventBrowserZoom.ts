import { useEffect } from "react";

// Pinch-to-zoom and Cmd/Ctrl +/- zoom the browser page, not the 3D camera.
// Block those so OrbitControls scroll zoom is the only zoom path.
export function usePreventBrowserZoom() {
  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        (event.key === "+" ||
          event.key === "-" ||
          event.key === "=" ||
          event.key === "0")
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("wheel", onWheel);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);
}
