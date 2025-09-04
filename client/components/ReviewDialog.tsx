import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface Review { name: string; rating: number; comment: string; createdAt: number }

export default function ReviewDialog({ tourId, onSaved }: { tourId: string; onSaved: (r: Review) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const save = () => {
    const review: Review = { name: name || "Anonymous", rating, comment, createdAt: Date.now() };
    try {
      const key = `reviews:${tourId}`;
      const current: Review[] = JSON.parse(localStorage.getItem(key) || "[]");
      current.push(review);
      localStorage.setItem(key, JSON.stringify(current));
      onSaved(review);
      setOpen(false);
      setName(""); setComment(""); setRating(5);
    } catch (e) { console.error(e); }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Write a Review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Share your experience</DialogTitle>
          <DialogDescription>Reviews are stored locally for this demo.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </div>
          <div>
            <Label htmlFor="rating">Rating</Label>
            <Input id="rating" type="number" min={1} max={5} value={rating} onChange={(e) => setRating(Number(e.target.value))} />
          </div>
          <div>
            <Label htmlFor="comment">Comment</Label>
            <Textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="What did you like?" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save}>Submit</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
