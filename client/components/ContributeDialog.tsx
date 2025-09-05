import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ContributeDialog({ tourId, onSaved }: { tourId: string; onSaved: (data: { images: string[]; videos: string[]; pano?: string }) => void }) {
  const [open, setOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [pano, setPano] = useState("");

  const fileToDataUrl = (file: File) =>
    new Promise<string>((res, rej) => {
      const fr = new FileReader();
      fr.onload = () => res(String(fr.result));
      fr.onerror = rej;
      fr.readAsDataURL(file);
    });

  const save = async () => {
    try {
      const images = await Promise.all(imageFiles.map((f) => fileToDataUrl(f)));
      const videos = await Promise.all(videoFiles.map((f) => fileToDataUrl(f)));
      const data = {
        images: images.filter(Boolean),
        videos: videos.filter(Boolean),
        pano: pano.trim() || undefined,
      };
      const key = `contrib:${tourId}`;
      localStorage.setItem(key, JSON.stringify(data));
      onSaved(data);
      setOpen(false);
      setImageFiles([]);
      setVideoFiles([]);
      setPano("");
    } catch (e) {
      console.error("Failed to save contribution", e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Contribute</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Contribute photos, videos, or 360°</DialogTitle>
          <DialogDescription>Upload files from your device. Files will be stored locally for this demo.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div>
            <Label htmlFor="images">Upload Images</Label>
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
              className="mt-2"
            />
            {imageFiles.length > 0 && (
              <div className="text-sm text-muted-foreground mt-2">{imageFiles.map((f) => f.name).join(', ')}</div>
            )}
          </div>
          <div>
            <Label htmlFor="videos">Upload Videos (optional)</Label>
            <input
              id="videos"
              type="file"
              accept="video/*"
              multiple
              onChange={(e) => setVideoFiles(Array.from(e.target.files || []))}
              className="mt-2"
            />
            {videoFiles.length > 0 && (
              <div className="text-sm text-muted-foreground mt-2">{videoFiles.map((f) => f.name).join(', ')}</div>
            )}
          </div>
          <div>
            <Label htmlFor="pano">360° URL or Google Maps Embed URL (optional)</Label>
            <Input id="pano" value={pano} onChange={(e) => setPano(e.target.value)} placeholder="https://.../panorama.jpg or https://www.google.com/maps/embed?..." />
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
