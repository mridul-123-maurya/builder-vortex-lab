import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = resolvedTheme === "dark";

  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggle}
      title={isDark ? "Switch to light" : "Switch to dark"}
    >
      {/* Avoid hydration mismatch by rendering after mount */}
      {mounted ? (
        <>
          <Sun className="h-5 w-5 hidden dark:block" />
          <Moon className="h-5 w-5 dark:hidden" />
        </>
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
}
