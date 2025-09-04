import { useEffect, useRef } from "react";
import PhotoSphereViewer from "photo-sphere-viewer";
import "photo-sphere-viewer/dist/photo-sphere-viewer.css";

export default function PanoViewer({ src, height = 400 }: { src: string; height?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const viewer = new PhotoSphereViewer({
      container: ref.current,
      panorama: src,
      touchmoveTwoFingers: true,
      navbar: ["zoom", "fullscreen"],
      defaultLong: 0,
      defaultLat: 0,
    });
    return () => viewer.destroy();
  }, [src]);

  return <div ref={ref} style={{ height }} className="w-full rounded-b-xl overflow-hidden" aria-label="360 degree viewer" />;
}
