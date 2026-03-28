"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ChevronDown, ArrowRight } from "lucide-react";
import type { CarouselSlide } from "@/types";

export interface HeroDefaultContent {
  eyebrow: string;
  headline: string;
  subheadline: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

interface Props {
  slides: CarouselSlide[];
  defaultContent: HeroDefaultContent;
}

export default function HeroCarousel({ slides, defaultContent }: Props) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-slide
  useEffect(() => {
    if (slides.length <= 1 || paused) return;
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [slides.length, paused]);

  // Fade text out → swap → fade in on slide change
  useEffect(() => {
    if (displayedIndex === current) return;
    setTextVisible(false);
    const t = setTimeout(() => {
      setDisplayedIndex(current);
      setTextVisible(true);
    }, 200);
    return () => clearTimeout(t);
  }, [current, displayedIndex]);

  if (!slides.length) return null;

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  // Resolve content for the currently displayed slide
  const slide = slides[displayedIndex];
  const headline = slide?.headline?.trim() || defaultContent.headline;
  const subheadline = slide?.subheadline?.trim() || defaultContent.subheadline;
  const ctaPrimary = {
    label: slide?.ctaPrimaryLabel?.trim() || defaultContent.ctaPrimary.label,
    href: slide?.ctaPrimaryHref?.trim() || defaultContent.ctaPrimary.href,
  };
  const ctaSecondary = defaultContent.ctaSecondary;

  return (
    <>
      {/* ── Background images ─────────────────────── */}
      <div
        className="absolute inset-0"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.url}
              alt={s.alt}
              className="w-full h-full object-cover"
              style={{ filter: "sepia(20%) brightness(0.65) saturate(1.2)" }}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}

        {/* Gradient overlay on top of images */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/90 via-[#1a0f1f]/40 to-[#000000]/95 to-transparent" />
      </div>

      {/* ── Text content ──────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div
          className="max-w-3xl transition-opacity duration-300"
          style={{ opacity: textVisible ? 1 : 0 }}
        >
          {/* Eyebrow */}
          <p className="text-plum-primary-container/90 text-xs font-bold uppercase tracking-[0.2em] mb-5">
            {defaultContent.eyebrow}
          </p>

          {/* Headline */}
          <h1
            className="font-display font-bold text-white leading-tight mb-6"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            {headline.includes("\n") ? (
              headline.split("\n").map((line, i) => (
                <span key={i}>
                  {i === 0 ? line : <><br /><span className="text-plum-primary-container">{line}</span></>}
                </span>
              ))
            ) : (
              <>
                {headline.split(" ").slice(0, -2).join(" ")}<br />
                <span className="text-plum-primary-container">
                  {headline.split(" ").slice(-2).join(" ")}
                </span>
              </>
            )}
          </h1>

          {/* Subheadline */}
          <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
            {subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={ctaPrimary.href}
              className="inline-flex items-center justify-center gap-2 bg-white text-plum-on-surface font-bold px-8 py-4 rounded-full hover:bg-plum-surface-low transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base"
            >
              {ctaPrimary.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={ctaSecondary.href}
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 hover:border-white/60 transition-all duration-200 text-base"
            >
              {ctaSecondary.label}
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-white/10">
            {["ISO 9001 Certified", "BRCGS AA Grade", "15+ Years Experience"].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-plum-primary-container" />
                <span className="text-white/70 text-sm font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Prev / Next arrows ────────────────────── */}
      {slides.length > 1 && (
        <div className="absolute bottom-20 right-8 flex items-center gap-2 z-10">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/20 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/20 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── Dot indicators ────────────────────────── */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                background: i === current ? "white" : "rgba(255,255,255,0.4)",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* ── Scroll indicator ──────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float z-10">
        <ChevronDown className="w-6 h-6 text-white/40" />
      </div>
    </>
  );
}
