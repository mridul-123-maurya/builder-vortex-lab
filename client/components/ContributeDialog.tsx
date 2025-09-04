import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ContributeDialog({ tourId, onSaved }: { tourId: string; onSaved: (data: { images: string[]; videos: string[]; pano?: string }) => void }) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState("");
  const [videos, setVideos] = useState("");
  const [pano, setPano] = useState("");

  const save = () => {
    const data = {
      images: images.split(/\n|,\s?/).map((s) => s.trim()).filter(Boolean),
      videos: videos.split(/\n|,\s?/).map((s) => s.trim()).filter(Boolean),
      pano: pano.trim() || undefined,
    };
    try {
      const key = `contrib:${tourId}`;
      localStorage.setItem(key, JSON.stringify(data));
      onSaved(data);
      setOpen(false);
    } catch (e) {
      console.error("Failed to save contribution", e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Contribute</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Contribute photos, videos, or 360°</DialogTitle>
          <DialogDescription>Paste public URLs. We will add them to this tour locally; for production, connect storage later.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div>
            <Label htmlFor="images">Image URLs (comma or newline separated)</Label>
            <Textarea id="images" value={images} onChange={(e) => setImages(e.target.value)} placeholder="https://...jpg\nhttps://...png" />
          </div>
          <div>
            <Label htmlFor="videos">Video URLs (optional)</Label>
            <Textarea id="videos" value={videos} onChange={(e) => setVideos(e.target.value)} placeholder="https://...mp4, https://youtube.com/..." />
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
