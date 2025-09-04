import { useEffect, useState } from "react";

export default function OfflineBanner() {
  const [offline, setOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const on = () => setOffline(false);
    const off = () => setOffline(true);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  if (!offline) return null;

  return (
    <div role="status" className="w-full bg-destructive text-destructive-foreground text-center py-2 text-sm">
      You are offline. Some features may be limited.
    </div>
  );
}
