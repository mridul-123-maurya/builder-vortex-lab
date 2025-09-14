import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : false;

  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      onClick={toggle}
      aria-pressed={isDark}
      aria-label="Toggle theme"
      title={isDark ? "Switch to light" : "Switch to dark"}
      className={`relative inline-flex h-8 w-14 items-center rounded-full p-1 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        ${isDark ? "bg-gradient-to-r from-slate-700 to-slate-900" : "bg-gradient-to-r from-yellow-200 to-yellow-300"}`}
    >
      <span className={`absolute left-1 text-yellow-600 transition-opacity duration-300 ${isDark ? "opacity-0" : "opacity-100"}`}>
        <Sun className="h-4 w-4" />
      </span>
      <span className={`absolute right-1 text-indigo-200 transition-opacity duration-300 ${isDark ? "opacity-100" : "opacity-0"}`}>
        <Moon className="h-4 w-4" />
      </span>

      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300
          ${isDark ? "translate-x-6 bg-slate-800" : "translate-x-0 bg-white"}`}
      />
    </button>
  );
}
