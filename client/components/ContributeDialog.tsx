import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ContributeDialog({ tourId, onSaved }: { tourId: string; onSaved: (data: { images: string[]; videos: string[]; pano?: string }) => void }) {
  const [open, setOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
  const [panoFile, setPanoFile] = useState<File | null>(null);
  const [panoPreview, setPanoPreview] = useState("");
  const [panoUrl, setPanoUrl] = useState("");

  const fileToDataUrl = (file: File) =>
    new Promise<string>((res, rej) => {
      const fr = new FileReader();
      fr.onload = () => res(String(fr.result));
      fr.onerror = rej;
      fr.readAsDataURL(file);
    });

  const setImagesFromFiles = async (files: File[]) => {
    setImageFiles((prev) => [...prev, ...files]);
    const previews = await Promise.all(files.map((f) => fileToDataUrl(f)));
    setImagePreviews((prev) => [...prev, ...previews.filter(Boolean)]);
  };

  const setVideosFromFiles = async (files: File[]) => {
    setVideoFiles((prev) => [...prev, ...files]);
    const previews = await Promise.all(files.map((f) => fileToDataUrl(f)));
    setVideoPreviews((prev) => [...prev, ...previews.filter(Boolean)]);
  };

  const handleImageChange = (files: FileList | null) => {
    const arr = Array.from(files || []);
    if (!arr.length) return;
    setImagesFromFiles(arr);
  };

  const handleVideoChange = (files: FileList | null) => {
    const arr = Array.from(files || []);
    if (!arr.length) return;
    setVideosFromFiles(arr);
  };

  const handlePanoFileChange = async (fileList: FileList | null) => {
    const f = fileList && fileList[0];
    if (!f) {
      setPanoFile(null);
      setPanoPreview("");
      return;
    }
    setPanoFile(f);
    const data = await fileToDataUrl(f);
    setPanoPreview(data);
    setPanoUrl("");
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    setVideoFiles((prev) => prev.filter((_, i) => i !== index));
    setVideoPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onDropImages = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
    if (files.length) setImagesFromFiles(files);
  };

  const onDropVideos = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("video/"));
    if (files.length) setVideosFromFiles(files);
  };

  const save = async () => {
    try {
      const images = await Promise.all(imageFiles.map((f) => fileToDataUrl(f)));
      const videos = await Promise.all(videoFiles.map((f) => fileToDataUrl(f)));
      const pano = panoFile ? await fileToDataUrl(panoFile) : panoUrl.trim() || undefined;
      const data = {
        images: images.filter(Boolean),
        videos: videos.filter(Boolean),
        pano: pano,
      };
      const key = `contrib:${tourId}`;
      localStorage.setItem(key, JSON.stringify(data));
      onSaved(data);
      setOpen(false);
      setImageFiles([]);
      setImagePreviews([]);
      setVideoFiles([]);
      setVideoPreviews([]);
      setPanoFile(null);
      setPanoPreview("");
      setPanoUrl("");
    } catch (e) {
      console.error("Failed to save contribution", e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Contribute</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Contribute photos, videos, or 360°</DialogTitle>
          <DialogDescription>Upload files from your device or provide a URL. Files are stored locally for this demo.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDropImages}
            className="p-4 rounded-lg border border-dashed border-slate-200 bg-slate-50"
          >
            <Label className="flex items-center justify-between">
              <span>Images</span>
              <span className="text-xs text-muted-foreground">Drag & drop or click to select</span>
            </Label>
            <label className="mt-3 flex h-28 cursor-pointer items-center justify-center rounded-md bg-white border p-4 text-sm text-muted-foreground">
              <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleImageChange(e.target.files)} />
              <div className="text-center">
                <div className="mb-1 font-medium">Select images</div>
                <div className="text-xs">JPEG, PNG — up to a few files</div>
              </div>
            </label>

            {imagePreviews.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {imagePreviews.map((p, i) => (
                  <div key={i} className="relative">
                    <img src={p} className="w-full h-28 object-cover rounded" alt={`preview-${i}`} />
                    <button
                      aria-label={`Remove image ${i + 1}`}
                      onClick={() => removeImage(i)}
                      className="absolute right-1 top-1 rounded bg-black/60 text-white text-xs px-2 py-1"
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDropVideos}
            className="p-4 rounded-lg border border-dashed border-slate-200 bg-slate-50"
          >
            <Label className="flex items-center justify-between">
              <span>Videos</span>
              <span className="text-xs text-muted-foreground">Drag & drop or click to select</span>
            </Label>
            <label className="mt-3 flex h-28 cursor-pointer items-center justify-center rounded-md bg-white border p-4 text-sm text-muted-foreground">
              <input type="file" accept="video/*" multiple className="hidden" onChange={(e) => handleVideoChange(e.target.files)} />
              <div className="text-center">
                <div className="mb-1 font-medium">Select videos</div>
                <div className="text-xs">MP4, MOV — short clips work best</div>
              </div>
            </label>

            {videoPreviews.length > 0 && (
              <div className="mt-3 grid grid-cols-1 gap-2">
                {videoPreviews.map((p, i) => (
                  <div key={i} className="relative">
                    <video src={p} className="w-full h-36 rounded" controls />
                    <button
                      aria-label={`Remove video ${i + 1}`}
                      onClick={() => removeVideo(i)}
                      className="absolute right-1 top-1 rounded bg-black/60 text-white text-xs px-2 py-1"
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 rounded-lg border bg-slate-50">
            <Label className="mb-2">360° Panorama</Label>
            <div className="flex gap-3 items-start">
              <label className="flex h-12 items-center rounded-md bg-white border px-3 text-sm cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePanoFileChange(e.target.files)} />
                Upload panorama
              </label>
              <div className="flex-1">
                <Input value={panoUrl} onChange={(e) => { setPanoUrl(e.target.value); if (e.target.value) { setPanoFile(null); setPanoPreview(""); } }} placeholder="Or paste Google Maps embed URL or panorama image URL" />
                {panoPreview ? (
                  <img src={panoPreview} alt="pano-preview" className="mt-3 w-full h-44 object-cover rounded" />
                ) : (
                  panoUrl && <div className="mt-3 text-sm text-muted-foreground">Using URL preview (will be embedded if valid).</div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
