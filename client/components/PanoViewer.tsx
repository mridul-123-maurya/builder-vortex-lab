import { useEffect, useRef } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";

export default function PanoViewer({ src, height = 400 }: { src: string; height?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);

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
    return () => viewer.destroy();
  }, [src]);

  return <div ref={ref} style={{ height }} className="w-full rounded-b-xl overflow-hidden" aria-label="360 degree viewer" />;
}
