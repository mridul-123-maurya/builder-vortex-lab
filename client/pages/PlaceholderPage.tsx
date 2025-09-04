import { Link } from "react-router-dom";

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="container py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-muted-foreground">
          This section is coming soon. Tell Fusion what to add next and we will
          build it out.
        </p>
        <div className="mt-6 inline-flex rounded-xl border bg-secondary/60 px-4 py-3 text-sm">
          We recommend continuing with the Virtual Tours and Home pages first.
        </div>
        <div className="mt-8">
          <Link className="text-primary underline" to="/">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
