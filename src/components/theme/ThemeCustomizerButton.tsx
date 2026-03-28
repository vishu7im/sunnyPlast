"use client";

import { useState } from "react";
import { Palette } from "lucide-react";
import { ThemeCustomizerPanel } from "./ThemeCustomizerPanel";

export default function ThemeCustomizerButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full text-white shadow-button flex items-center justify-center hover:opacity-90 transition-all hover:-translate-y-0.5 hover:shadow-lg"
        style={{ background: "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-container) 100%)" }}
        aria-label="Customise theme"
      >
        <Palette className="w-5 h-5" />
      </button>
      {open && <ThemeCustomizerPanel onClose={() => setOpen(false)} />}
    </>
  );
}
