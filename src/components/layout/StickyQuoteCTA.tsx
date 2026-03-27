"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function StickyQuoteCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-gradient-cta text-white px-4 py-3 flex items-center justify-between shadow-2xl">
      <span className="text-sm font-semibold">Ready to get started?</span>
      <Link
        href="/contact"
        className="flex items-center gap-1.5 bg-white text-plum-on-surface text-sm font-bold px-4 py-2 rounded-full hover:bg-plum-surface-low transition-colors"
      >
        Get a Quote
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
