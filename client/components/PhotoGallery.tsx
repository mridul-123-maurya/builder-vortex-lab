export default function PhotoGallery({ images }: { images: string[] }) {
  const validImages = (images || []).filter((s) => !!s);
  if (!validImages.length) return null;
  return (
    <div className="grid gap-3 grid-cols-3">
      {validImages.map((src, i) => (
        <figure key={i} className="rounded-xl overflow-hidden border-[0.8px] border-[#e2dccf]">
          <img
            src={src}
            alt="Monastery photo"
            className="block w-full h-44 object-cover"
            loading="lazy"
          />
        </figure>
      ))}
    </div>
  );
}
