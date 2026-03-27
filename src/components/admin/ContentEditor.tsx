"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Save, CheckCircle2 } from "lucide-react";
import type { SiteContent } from "@/types";
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
