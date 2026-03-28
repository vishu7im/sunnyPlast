"use client";

import { X, RotateCcw, Sun, Moon, Film, Check } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const COLOR_PRESETS = [
  { name: "Blue",   primary: "#1a56db", container: "#76b0f5" },
  { name: "Plum",   primary: "#a61c82", container: "#fc69cd" },
  { name: "Teal",   primary: "#0d9488", container: "#5eead4" },
  { name: "Coral",  primary: "#e11d48", container: "#fda4af" },
  { name: "Forest", primary: "#15803d", container: "#86efac" },
  { name: "Amber",  primary: "#d97706", container: "#fcd34d" },
];

const FONT_OPTIONS = [
  { name: "Manrope",          family: "Manrope",          label: "Modern"  },
  { name: "Playfair Display", family: "Playfair Display", label: "Serif"   },
  { name: "JetBrains Mono",   family: "JetBrains Mono",   label: "Mono"    },
  { name: "Space Grotesk",    family: "Space Grotesk",     label: "Display" },
];

const QUICK_PRESETS = [
  { label: "Classic Blue",   primary: "#1a56db", container: "#76b0f5", font: "Manrope",          mode: "light" },
  { label: "Classic Plum",   primary: "#a61c82", container: "#fc69cd", font: "Manrope",          mode: "light" },
  { label: "Editorial Dark", primary: "#76b0f5", container: "#1a56db", font: "Playfair Display", mode: "dark"  },
  { label: "Vintage Retro",  primary: "#8b5e3c", container: "#d4a574", font: "Playfair Display", mode: "retro" },
];

const MODE_OPTIONS = [
  { id: "light", label: "Light", Icon: Sun  },
  { id: "dark",  label: "Dark",  Icon: Moon },
  { id: "retro", label: "Retro", Icon: Film },
];

function lightenHex(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.round(((num >> 16) & 0xff) + (255 - ((num >> 16) & 0xff)) * amount));
  const g = Math.min(255, Math.round(((num >> 8) & 0xff) + (255 - ((num >> 8) & 0xff)) * amount));
  const b = Math.min(255, Math.round((num & 0xff) + (255 - (num & 0xff)) * amount));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export function ThemeCustomizerPanel({ onClose }: { onClose: () => void }) {
  const { primaryColor, fontName, mode, setColor, setFont, setMode, reset } = useTheme();

  const isActivePreset = (p: (typeof QUICK_PRESETS)[0]) =>
    primaryColor === p.primary && mode === p.mode;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-80 bg-white shadow-2xl flex flex-col overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="font-display font-bold text-plum-on-surface text-base">Customise Theme</h2>
            <p className="text-xs text-plum-on-surface-variant mt-0.5">Personalise your experience</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-plum-on-surface-variant" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-7">

          {/* Quick Presets */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-plum-on-surface-variant mb-3">
              Quick Presets
            </p>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_PRESETS.map((p) => {
                const active = isActivePreset(p);
                return (
                  <button
                    key={p.label}
                    onClick={() => {
                      setColor(p.primary, p.container);
                      setFont(p.font, p.font);
                      setMode(p.mode);
                    }}
                    className={`text-left px-3 py-2.5 rounded-xl border-2 transition-all ${
                      active
                        ? "border-[var(--brand-primary)] bg-plum-surface shadow-sm"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${p.primary}, ${p.container})` }}
                        />
                        <span className="text-xs font-semibold text-plum-on-surface leading-tight">{p.label}</span>
                      </div>
                      {active && <Check className="w-3 h-3 flex-shrink-0" style={{ color: "var(--brand-primary)" }} />}
                    </div>
                    <span className="text-[10px] text-plum-on-surface-variant capitalize">
                      {p.mode} · {p.font.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accent Colour */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-plum-on-surface-variant mb-3">
              Accent Colour
            </p>
            <div className="flex flex-wrap gap-2.5 mb-4">
              {COLOR_PRESETS.map((c) => {
                const active = primaryColor === c.primary;
                return (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.primary, c.container)}
                    title={c.name}
                    className="relative w-8 h-8 rounded-full transition-transform hover:scale-110 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${c.primary}, ${c.container})`,
                      boxShadow: active
                        ? `0 0 0 2px white, 0 0 0 4px ${c.primary}`
                        : "0 2px 6px rgba(0,0,0,0.15)",
                    }}
                  >
                    {active && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                  </button>
                );
              })}
            </div>
            <label className="flex items-center gap-3">
              <span className="text-xs text-plum-on-surface-variant">Custom:</span>
              <input
                type="color"
                defaultValue={primaryColor}
                onBlur={(e) => {
                  const hex = e.target.value;
                  setColor(hex, lightenHex(hex, 0.5));
                }}
                className="w-10 h-8 rounded-lg cursor-pointer border border-gray-200 p-0.5"
              />
            </label>
          </div>

          {/* Font Style */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-plum-on-surface-variant mb-3">
              Font Style
            </p>
            <div className="space-y-2">
              {FONT_OPTIONS.map((f) => {
                const active = fontName === f.name;
                return (
                  <button
                    key={f.name}
                    onClick={() => setFont(f.family, f.name)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${
                      active
                        ? "border-[var(--brand-primary)] bg-plum-surface shadow-sm"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <span className={`text-sm font-semibold ${active ? "text-[var(--brand-primary)]" : "text-plum-on-surface"}`}>
                      {f.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-plum-on-surface-variant">{f.name.split(" ")[0]}</span>
                      {active && <Check className="w-4 h-4" style={{ color: "var(--brand-primary)" }} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Theme Mode */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-plum-on-surface-variant mb-3">
              Theme Mode
            </p>
            <div className="grid grid-cols-3 gap-2">
              {MODE_OPTIONS.map(({ id, label, Icon }) => {
                const active = mode === id;
                return (
                  <button
                    key={id}
                    onClick={() => setMode(id)}
                    className={`relative flex flex-col items-center gap-2 py-3 rounded-xl border-2 transition-all ${
                      active
                        ? "border-[var(--brand-primary)] bg-plum-surface shadow-sm"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {active && (
                      <Check
                        className="absolute top-1.5 right-1.5 w-3 h-3"
                        style={{ color: "var(--brand-primary)" }}
                        strokeWidth={3}
                      />
                    )}
                    <Icon
                      className="w-5 h-5"
                      style={{ color: active ? "var(--brand-primary)" : "#744f71" }}
                    />
                    <span className={`text-xs font-semibold ${active ? "text-[var(--brand-primary)]" : "text-plum-on-surface"}`}>
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100">
          <button
            onClick={reset}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-gray-200 text-sm text-plum-on-surface-variant hover:border-gray-300 hover:text-plum-on-surface transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Default
          </button>
        </div>
      </div>
    </>
  );
}
