import React, { useMemo, useState } from "react";
import archivesData from "@/data/archives.json";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

type ArchiveItem = {
  id: string;
  title: string;
  monastery: string;
  century?: string;
  type: "text" | "image" | "audio" | string;
  thumbnail?: string;
  wikipedia?: string;
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
      const matchesText =
        !s ||
        i.title.toLowerCase().includes(s) ||
        i.monastery.toLowerCase().includes(s) ||
        (i.century || "").toLowerCase().includes(s);
      const matchesMon = monastery === "all" || i.monastery === monastery;
      const matchesKind = kind === "all" || i.type === kind;
      return matchesText && matchesMon && matchesKind;
    });
  }, [q, monastery, kind]);

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            Digital Archives
          </h1>
          <p className="mt-1 text-muted-foreground">
            Explore digitized manuscripts, thangkas, audio, and cultural
            records.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full bg-muted px-2 py-0.5">{items.length} items</span>
            {kind !== "all" && <span className="rounded-full bg-muted px-2 py-0.5">{kind}</span>}
            {monastery !== "all" && <span className="rounded-full bg-muted px-2 py-0.5">{monastery}</span>}
          </div>
        </header>

        <div className="sticky top-[60px] z-10 mb-6 grid grid-cols-1 gap-3 rounded-xl border bg-background/70 p-3 backdrop-blur md:grid-cols-3">
          <div>
            <label className="sr-only" htmlFor="archive-q">
              Search
            </label>
            <Input
              id="archive-q"
              placeholder="Search title, monastery, or century"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
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
                <option key={m} value={m}>
                  {m}
                </option>
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
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
        </div>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <Card
              key={it.id}
              className="overflow-hidden transition hover:shadow-xl"
            >
              {it.thumbnail ? (
                <div className="relative">
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={it.thumbnail}
                      alt={it.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </AspectRatio>
                  {it.wikipedia && (
                    <a
                      href={it.wikipedia}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-xs font-medium shadow hover:bg-white"
                    >
                      Wiki
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
                      </svg>
                    </a>
                  )}
                </div>
              ) : (
                <Skeleton className="h-40 w-full" />
              )}
              <CardHeader>
                <CardTitle className="text-lg">{it.title}</CardTitle>
                <CardDescription>
                  <span>{it.monastery}</span>
                  {it.century && <span className="ml-2">• {it.century}</span>}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 flex items-center justify-between">
                <Badge variant="secondary" className="capitalize">
                  {it.type}
                </Badge>
                {it.wikipedia ? (
                  <Button asChild variant="ghost" size="sm">
                    <a href={it.wikipedia} target="_blank" rel="noreferrer">Open Wikipedia</a>
                  </Button>
                ) : (
                  <span className="text-sm text-muted-foreground">No link</span>
                )}
              </CardContent>
            </Card>
          ))}
        </section>

        {items.length === 0 && (
          <div className="mt-6 rounded-md border border-dashed p-6 text-center text-muted-foreground">
            No items found.
          </div>
        )}
      </div>
    </div>
  );
}
