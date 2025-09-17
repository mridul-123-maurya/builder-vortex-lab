import React, { useMemo, useState } from "react";
import archivesData from "@/data/archives.json";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

 type ArchiveItem = {
  id: string;
  title: string;
  monastery: string;
  century?: string;
  type: "text" | "image" | "audio" | string;
  thumbnail?: string;
};

const allItems = archivesData as unknown as ArchiveItem[];

export default function DigitalArchives() {
  const [q, setQ] = useState("");
  const [monastery, setMonastery] = useState<string>("all");
  const [kind, setKind] = useState<string>("all");

  const monasteries = useMemo(
    () => Array.from(new Set(allItems.map((i) => i.monastery))).sort(),
    [],
  );
  const kinds = useMemo(
    () => Array.from(new Set(allItems.map((i) => i.type))).sort(),
    [],
  );

  const items = useMemo(() => {
    const s = q.trim().toLowerCase();
    return allItems.filter((i) => {
      const matchesText = !s || i.title.toLowerCase().includes(s) || i.monastery.toLowerCase().includes(s) || (i.century || "").toLowerCase().includes(s);
      const matchesMon = monastery === "all" || i.monastery === monastery;
      const matchesKind = kind === "all" || i.type === kind;
      return matchesText && matchesMon && matchesKind;
    });
  }, [q, monastery, kind]);

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold">Digital Archives</h1>
          <p className="mt-1 text-muted-foreground">Explore digitized manuscripts, thangkas, audio, and cultural records.</p>
        </header>

        <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div>
            <label className="sr-only" htmlFor="archive-q">Search</label>
            <Input id="archive-q" placeholder="Search title, monastery, or century" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Monastery</label>
            <select
              value={monastery}
              onChange={(e) => setMonastery(e.target.value)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-2 text-sm"
            >
              <option value="all">All</option>
              {monasteries.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Type</label>
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-2 text-sm"
            >
              <option value="all">All</option>
              {kinds.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>
        </div>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <Card key={it.id} className="overflow-hidden hover:shadow-md transition">
              {it.thumbnail && (
                <img src={it.thumbnail} alt={it.title} className="h-40 w-full object-cover" loading="lazy" decoding="async" />
              )}
              <CardHeader>
                <CardTitle className="text-lg">{it.title}</CardTitle>
                <CardDescription>
                  <span>{it.monastery}</span>
                  {it.century && <span className="ml-2">• {it.century}</span>}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 flex items-center justify-between">
                <Badge variant="secondary" className="capitalize">{it.type}</Badge>
                <a href="#" className="text-sm text-primary underline">Details</a>
              </CardContent>
            </Card>
          ))}
        </section>

        {items.length === 0 && (
          <div className="mt-6 rounded-md border border-dashed p-6 text-center text-muted-foreground">No items found.</div>
        )}
      </div>
    </div>
  );
}
