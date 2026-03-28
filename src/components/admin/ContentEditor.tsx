"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Save, CheckCircle2, Plus, Trash2, ArrowUp, ArrowDown, ChevronRight, ImageIcon } from "lucide-react";
import type { SiteContent, CarouselSlide } from "@/types";
import Button from "@/components/ui/Button";

interface ContentEditorProps {
  content: SiteContent;
}

export default function ContentEditor({ content }: ContentEditorProps) {
  const router = useRouter();
  const [openSection, setOpenSection] = useState<string>("hero");
  const [data, setData] = useState<SiteContent>(content);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [expandedSlide, setExpandedSlide] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoFileRef = useRef<HTMLInputElement>(null);

  function getValue(keys: string[]): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let v: any = data;
    for (const k of keys) v = v?.[k];
    return typeof v === "string" ? v : "";
  }

  function setValue(keys: string[], value: string) {
    setData((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const next: any = JSON.parse(JSON.stringify(prev));
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  }

  async function saveSection(sectionKey: string) {
    setSaving(sectionKey);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sectionData: any = {};
      sectionData[sectionKey] = (data as unknown as Record<string, unknown>)[sectionKey];

      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sectionData),
      });

      if (res.ok) {
        setSaved(sectionKey);
        setTimeout(() => setSaved(null), 2000);
        router.refresh();
      }
    } finally {
      setSaving(null);
    }
  }

  // ── Carousel helpers ──────────────────────────────
  const carousel: CarouselSlide[] = data.hero.heroCarousel ?? [];

  function setCarousel(slides: CarouselSlide[]) {
    setData((prev) => ({
      ...prev,
      hero: { ...prev.hero, heroCarousel: slides },
    }));
  }

  function moveSlide(index: number, dir: -1 | 1) {
    const next = [...carousel];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setCarousel(next);
  }

  function removeSlide(id: string) {
    setCarousel(carousel.filter((s) => s.id !== id));
  }

  async function uploadCarouselImage(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) return;
      const { url } = await res.json();
      const newSlide: CarouselSlide = {
        id: `slide-${Date.now()}`,
        url,
        alt: file.name.replace(/\.[^.]+$/, ""),
      };
      setCarousel([...carousel, newSlide]);
    } finally {
      setUploading(false);
    }
  }

  async function saveCarousel() {
    setSaving("carousel");
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hero: data.hero }),
      });
      if (res.ok) {
        setSaved("carousel");
        setTimeout(() => setSaved(null), 2000);
        router.refresh();
      }
    } finally {
      setSaving(null);
    }
  }

  function updateSlide(id: string, updates: Partial<Omit<CarouselSlide, "id">>) {
    setCarousel(carousel.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  }

  async function uploadLogo(file: File) {
    setLogoUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) return;
      const { url } = await res.json();
      setData((prev) => ({ ...prev, site: { ...prev.site, logo: url } }));
    } finally {
      setLogoUploading(false);
    }
  }

  const sections = [
    {
      id: "hero",
      label: "Hero Section",
      fields: [
        { key: "hero.headline", label: "Headline" },
        { key: "hero.subheadline", label: "Subheadline", type: "textarea" as const },
        { key: "hero.ctaPrimary.label", label: "Primary CTA Label" },
        { key: "hero.ctaSecondary.label", label: "Secondary CTA Label" },
      ],
    },
    {
      id: "site",
      label: "Site Settings",
      fields: [
        { key: "site.companyName", label: "Company Name" },
        { key: "site.tagline", label: "Tagline" },
        { key: "site.phone", label: "Phone" },
        { key: "site.email", label: "Email" },
        { key: "site.whatsapp", label: "WhatsApp Number" },
        { key: "site.address.line1", label: "Address Line 1" },
        { key: "site.address.line2", label: "Address Line 2" },
        { key: "site.address.postcode", label: "Postcode" },
      ],
    },
    {
      id: "about",
      label: "About Page",
      fields: [
        { key: "about.headline", label: "Headline" },
        { key: "about.story", label: "Story (use blank lines for paragraphs)", type: "textarea" as const },
      ],
    },
    {
      id: "contact",
      label: "Contact Page",
      fields: [
        { key: "contact.formHeadline", label: "Form Headline" },
        { key: "contact.formSubtext", label: "Form Subtext" },
      ],
    },
    {
      id: "footer",
      label: "Footer",
      fields: [
        { key: "footer.copyrightText", label: "Copyright Text" },
        { key: "footer.companyRegNumber", label: "Company Reg Number" },
      ],
    },
  ];

  return (
    <div className="space-y-3">
      {/* Hero Carousel accordion */}
      <div className="bg-white rounded-xl border border-steel-200 overflow-hidden">
        <button
          onClick={() => setOpenSection(openSection === "carousel" ? "" : "carousel")}
          className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-steel-50 transition-colors"
        >
          <span className="font-semibold text-navy-900">Hero Carousel</span>
          {openSection === "carousel"
            ? <ChevronUp className="w-4 h-4 text-steel-400" />
            : <ChevronDown className="w-4 h-4 text-steel-400" />}
        </button>

        {openSection === "carousel" && (
          <div className="px-6 pb-6 border-t border-steel-100 pt-5">
            <p className="text-xs text-steel-400 mb-4">
              Upload images that cycle in the hero background. Drag up/down to reorder.
            </p>

            {/* Slide list */}
            <div className="space-y-2 mb-4">
              {carousel.length === 0 && (
                <p className="text-sm text-steel-400 py-3 text-center border border-dashed border-steel-200 rounded-lg">
                  No slides yet — upload an image below.
                </p>
              )}
              {carousel.map((slide, i) => {
                const isExpanded = expandedSlide === slide.id;
                return (
                  <div key={slide.id} className="rounded-lg border border-steel-200 overflow-hidden">
                    {/* Slide header row */}
                    <div className="flex items-center gap-3 p-3 bg-steel-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={slide.url}
                        alt={slide.alt}
                        className="w-16 h-10 object-cover rounded flex-shrink-0 bg-steel-200"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                      <button
                        onClick={() => setExpandedSlide(isExpanded ? null : slide.id)}
                        className="flex-1 flex items-center gap-1.5 text-left min-w-0"
                      >
                        <span className="text-xs text-navy-700 truncate">{slide.alt || slide.url}</span>
                        <ChevronRight className={`w-3 h-3 text-steel-400 flex-shrink-0 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                      </button>
                      <button
                        onClick={() => moveSlide(i, -1)}
                        disabled={i === 0}
                        className="w-6 h-6 flex items-center justify-center rounded hover:bg-steel-200 disabled:opacity-30 transition-colors"
                        aria-label="Move up"
                      >
                        <ArrowUp className="w-3 h-3 text-steel-500" />
                      </button>
                      <button
                        onClick={() => moveSlide(i, 1)}
                        disabled={i === carousel.length - 1}
                        className="w-6 h-6 flex items-center justify-center rounded hover:bg-steel-200 disabled:opacity-30 transition-colors"
                        aria-label="Move down"
                      >
                        <ArrowDown className="w-3 h-3 text-steel-500" />
                      </button>
                      <button
                        onClick={() => removeSlide(slide.id)}
                        className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-50 text-red-400 transition-colors"
                        aria-label="Remove slide"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Per-slide text fields */}
                    {isExpanded && (
                      <div className="p-3 border-t border-steel-100 bg-white space-y-3">
                        <p className="text-[11px] text-steel-400 font-medium uppercase tracking-wider">
                          Slide Content — leave blank to use site defaults
                        </p>
                        {[
                          { key: "headline" as const, label: "Headline (optional)" },
                          { key: "subheadline" as const, label: "Subheadline (optional)" },
                          { key: "ctaPrimaryLabel" as const, label: "CTA Button Label (optional)" },
                          { key: "ctaPrimaryHref" as const, label: "CTA Button URL (optional)" },
                        ].map(({ key, label }) => (
                          <div key={key}>
                            <label className="block text-xs font-semibold text-navy-700 mb-1">{label}</label>
                            <input
                              type="text"
                              value={slide[key] ?? ""}
                              onChange={(e) => updateSlide(slide.id, { [key]: e.target.value })}
                              className="w-full px-2.5 py-2 rounded-lg border border-steel-200 text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 text-xs"
                              placeholder={label}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Upload */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadCarouselImage(file);
                e.target.value = "";
              }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-dashed border-steel-300 text-sm text-steel-500 hover:border-navy-400 hover:text-navy-600 transition-colors disabled:opacity-50 mb-4"
            >
              <Plus className="w-4 h-4" />
              {uploading ? "Uploading…" : "Upload Image"}
            </button>

            <Button
              onClick={saveCarousel}
              loading={saving === "carousel"}
              size="sm"
              className="gap-2"
            >
              {saved === "carousel" ? (
                <><CheckCircle2 className="w-4 h-4" />Saved</>
              ) : (
                <><Save className="w-4 h-4" />Save Carousel</>
              )}
            </Button>
          </div>
        )}
      </div>

      {sections.map((section) => {
        const isOpen = openSection === section.id;
        return (
          <div key={section.id} className="bg-white rounded-xl border border-steel-200 overflow-hidden">
            <button
              onClick={() => setOpenSection(isOpen ? "" : section.id)}
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-steel-50 transition-colors"
            >
              <span className="font-semibold text-navy-900">{section.label}</span>
              {isOpen ? <ChevronUp className="w-4 h-4 text-steel-400" /> : <ChevronDown className="w-4 h-4 text-steel-400" />}
            </button>

            {isOpen && (
              <div className="px-6 pb-6 border-t border-steel-100 pt-5">
                <div className="space-y-4 mb-6">
                  {section.fields.map((f) => {
                    const keys = f.key.split(".");
                    const val = getValue(keys);
                    return (
                      <div key={f.key}>
                        <label className="block text-sm font-semibold text-navy-700 mb-1.5">{f.label}</label>
                        {f.type === "textarea" ? (
                          <textarea
                            value={val}
                            onChange={(e) => setValue(keys, e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2.5 rounded-lg border border-steel-200 text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm resize-y"
                          />
                        ) : (
                          <input
                            type="text"
                            value={val}
                            onChange={(e) => setValue(keys, e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg border border-steel-200 text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Logo upload — only in Site Settings */}
                {section.id === "site" && (
                  <div className="mb-6 pb-6 border-b border-steel-100">
                    <label className="block text-sm font-semibold text-navy-700 mb-3">Company Logo</label>
                    <div className="flex items-center gap-4">
                      {/* Current logo preview */}
                      <div className="w-20 h-12 rounded-lg border border-steel-200 bg-steel-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {getValue(["site", "logo"]) ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={getValue(["site", "logo"])}
                            alt="Company logo"
                            className="w-full h-full object-contain p-1"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                          />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-steel-300" />
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <input
                          ref={logoFileRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/svg+xml"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) uploadLogo(file);
                            e.target.value = "";
                          }}
                        />
                        <button
                          onClick={() => logoFileRef.current?.click()}
                          disabled={logoUploading}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-steel-300 text-xs text-steel-500 hover:border-navy-400 hover:text-navy-600 transition-colors disabled:opacity-50"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          {logoUploading ? "Uploading…" : "Upload Logo"}
                        </button>
                        {getValue(["site", "logo"]) && (
                          <button
                            onClick={() => setValue(["site", "logo"], "")}
                            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                            Remove logo
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  onClick={() => saveSection(section.id)}
                  loading={saving === section.id}
                  size="sm"
                  className="gap-2"
                >
                  {saved === section.id ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save {section.label}
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
