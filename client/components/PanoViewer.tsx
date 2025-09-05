import { useEffect, useRef } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";

export default function PanoViewer({
  src,
  height = 400,
  onInteractionChange,
}: {
  src: string;
  height?: number;
  onInteractionChange?: (isInteracting: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const interactionTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const viewer = new Viewer({
      container: ref.current!,
      panorama: src,
      touchmoveTwoFingers: true,
      navbar: ["zoom", "fullscreen"],
      defaultYaw: 0,
      defaultPitch: 0,
    });

    const setInteracting = (val: boolean) => {
      if (onInteractionChange) onInteractionChange(val);
    };

    const clearInteractionTimeout = () => {
      if (interactionTimeout.current) {
        window.clearTimeout(interactionTimeout.current);
        interactionTimeout.current = null;
      }
    };

    const startInteraction = () => {
      clearInteractionTimeout();
      setInteracting(true);
    };
    const stopInteractionDelayed = () => {
      clearInteractionTimeout();
      // delay marking interaction end so small pauses don't stop rotation
      interactionTimeout.current = window.setTimeout(() => setInteracting(false), 2000);
    };

    const el = ref.current;
    el.addEventListener("pointerdown", startInteraction);
    el.addEventListener("touchstart", startInteraction);
    el.addEventListener("mousedown", startInteraction);

    el.addEventListener("pointerup", stopInteractionDelayed);
    el.addEventListener("touchend", stopInteractionDelayed);
    el.addEventListener("mouseup", stopInteractionDelayed);
    el.addEventListener("mouseleave", stopInteractionDelayed);

    return () => {
      viewer.destroy();
      clearInteractionTimeout();
      if (!el) return;
      el.removeEventListener("pointerdown", startInteraction);
      el.removeEventListener("touchstart", startInteraction);
      el.removeEventListener("mousedown", startInteraction);
      el.removeEventListener("pointerup", stopInteractionDelayed);
      el.removeEventListener("touchend", stopInteractionDelayed);
      el.removeEventListener("mouseup", stopInteractionDelayed);
      el.removeEventListener("mouseleave", stopInteractionDelayed);
    };
  }, [src, onInteractionChange]);

  return (
    <div
      ref={ref}
      style={{ height }}
      className="w-full rounded-b-xl overflow-hidden"
      aria-label="360 degree viewer"
    />
  );
}
