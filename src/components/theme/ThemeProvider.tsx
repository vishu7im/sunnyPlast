"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

export interface ThemeState {
  primaryColor: string;
  primaryContainer: string;
  fontFamily: string;
  fontName: string;
  mode: string;
}

interface ThemeContextValue extends ThemeState {
  setColor: (primary: string, container: string) => void;
  setFont: (family: string, name: string) => void;
  setMode: (mode: string) => void;
  reset: () => void;
}

const DEFAULT_THEME: ThemeState = {
  primaryColor: "#1a56db",
  primaryContainer: "#76b0f5",
  fontFamily: "'Manrope', system-ui, sans-serif",
  fontName: "Manrope",
  mode: "light",
};

const MODE_OVERRIDES: Record<string, string> = {
  dark: `
    body { background: #1a0d1a !important; color: #ffdff9 !important; }
    .bg-plum-surface { background: #2d1533 !important; }
    .bg-plum-surface-low { background: #3d1f3d !important; }
    .bg-plum-surface-mid { background: #4a2648 !important; }
    .bg-plum-surface-high { background: #562d54 !important; }
    .bg-plum-surface-highest { background: #623460 !important; }
    .text-plum-on-surface { color: #ffdff9 !important; }
    .text-plum-on-surface-variant { color: #e8c4e4 !important; }
  `,
  retro: `
    body { background: #f5f0e8 !important; color: #3d2b1f !important; }
    .bg-plum-surface { background: #f5f0e8 !important; }
    .bg-plum-surface-low { background: #ede8dc !important; }
    .bg-plum-surface-mid { background: #e5ddd0 !important; }
    .text-plum-on-surface { color: #3d2b1f !important; }
    .text-plum-on-surface-variant { color: #6b5547 !important; }
  `,
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

function loadGoogleFont(family: string) {
  const id = `gfont-${family.replace(/\s+/g, "-").toLowerCase()}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@400;500;600;700&display=swap`;
  document.head.appendChild(link);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeState>(DEFAULT_THEME);

  const applyTheme = useCallback((t: ThemeState) => {
    const root = document.documentElement;
    root.style.setProperty("--brand-primary", t.primaryColor);
    root.style.setProperty("--brand-primary-container", t.primaryContainer);
    root.style.setProperty("--font-manrope", t.fontFamily);

    let styleEl = document.getElementById("theme-mode-override") as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "theme-mode-override";
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = MODE_OVERRIDES[t.mode] || "";
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("sunnyplaste-theme");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ThemeState;
        if (parsed.fontName && parsed.fontName !== "Manrope") {
          loadGoogleFont(parsed.fontFamily.split("'")[1] || parsed.fontName);
        }
        setTheme(parsed);
        applyTheme(parsed);
      } catch {
        applyTheme(DEFAULT_THEME);
      }
    } else {
      applyTheme(DEFAULT_THEME);
    }
  }, [applyTheme]);

  const saveAndApply = useCallback(
    (next: ThemeState) => {
      setTheme(next);
      applyTheme(next);
      localStorage.setItem("sunnyplaste-theme", JSON.stringify(next));
    },
    [applyTheme]
  );

  const setColor = useCallback(
    (primary: string, container: string) => {
      saveAndApply({ ...theme, primaryColor: primary, primaryContainer: container });
    },
    [theme, saveAndApply]
  );

  const setFont = useCallback(
    (family: string, name: string) => {
      if (name !== "Manrope" && name !== "Inter") loadGoogleFont(family);
      saveAndApply({ ...theme, fontFamily: `'${family}', system-ui, sans-serif`, fontName: name });
    },
    [theme, saveAndApply]
  );

  const setMode = useCallback(
    (mode: string) => {
      saveAndApply({ ...theme, mode });
    },
    [theme, saveAndApply]
  );

  const reset = useCallback(() => {
    saveAndApply(DEFAULT_THEME);
  }, [saveAndApply]);

  return (
    <ThemeContext.Provider value={{ ...theme, setColor, setFont, setMode, reset }}>
      {children}
    </ThemeContext.Provider>
  );
}
