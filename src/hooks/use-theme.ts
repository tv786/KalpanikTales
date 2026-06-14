import { useEffect, useState } from "react";

const KEY = "kalpanik_theme";
type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem(KEY)) as Theme | null;
    const prefersDark =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const initial: Theme = stored ?? (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    const onThemeEvent = (e: Event) => {
      const detail = (e as CustomEvent).detail as Theme | undefined;
      if (detail) {
        setTheme(detail);
      }
    };
    document.addEventListener("kalpanik:theme", onThemeEvent as EventListener);
    return () => document.removeEventListener("kalpanik:theme", onThemeEvent as EventListener);
  }, []);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem(KEY, next);
    // notify other hook instances in this window
    try {
      document.dispatchEvent(new CustomEvent("kalpanik:theme", { detail: next }));
    } catch (err) {
      // ignore
    }
  }

  return { theme, toggleTheme };
}
