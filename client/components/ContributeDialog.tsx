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

  const handleImageChange = async (files: FileList | null) => {
    const arr = Array.from(files || []);
    setImageFiles(arr);
    const previews = await Promise.all(arr.map((f) => fileToDataUrl(f)));
    setImagePreviews(previews.filter(Boolean));
  };

  const handleVideoChange = async (files: FileList | null) => {
    const arr = Array.from(files || []);
    setVideoFiles(arr);
    const previews = await Promise.all(arr.map((f) => fileToDataUrl(f)));
    setVideoPreviews(previews.filter(Boolean));
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
          <div className="p-3 rounded-md border">
            <Label htmlFor="images">Upload Images</Label>
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleImageChange(e.target.files)}
              className="mt-2"
            />
            {imagePreviews.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {imagePreviews.map((p, i) => (
                  <img key={i} src={p} className="w-full h-24 object-cover rounded" alt={`preview-${i}`} />
                ))}
              </div>
            )}
          </div>

          <div className="p-3 rounded-md border">
            <Label htmlFor="videos">Upload Videos (optional)</Label>
            <input
              id="videos"
              type="file"
              accept="video/*"
              multiple
              onChange={(e) => handleVideoChange(e.target.files)}
              className="mt-2"
            />
            {videoPreviews.length > 0 && (
              <div className="mt-3 grid grid-cols-1 gap-2">
                {videoPreviews.map((p, i) => (
                  <video key={i} src={p} className="w-full h-32 rounded" controls />
                ))}
              </div>
            )}
          </div>

          <div className="p-3 rounded-md border">
            <Label>360° (upload or URL)</Label>
            <div className="flex gap-2 items-start mt-2">
              <input type="file" accept="image/*" onChange={(e) => handlePanoFileChange(e.target.files)} />
              <div className="flex-1">
                <Input value={panoUrl} onChange={(e) => { setPanoUrl(e.target.value); if (e.target.value) { setPanoFile(null); setPanoPreview(""); } }} placeholder="Or paste a Google Maps embed URL or direct panorama image URL" />
                {panoPreview && <img src={panoPreview} alt="pano-preview" className="mt-2 w-full h-48 object-cover rounded" />}
                {!panoPreview && panoUrl && <div className="mt-2 text-sm text-muted-foreground">Using URL preview (will be embedded if valid).</div>}
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
