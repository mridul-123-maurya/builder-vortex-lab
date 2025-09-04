export default function PhotoGallery({ images }: { images: string[] }) {
  if (!images?.length) return null;
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((src, i) => (
        <figure key={i} className="rounded-xl overflow-hidden border">
          <img
            src={src}
            alt="Monastery photo"
            className="w-full h-44 object-cover"
            loading="lazy"
          />
        </figure>
      ))}
    </div>
  );
}
