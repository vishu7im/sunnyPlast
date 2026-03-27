"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Package2, Phone } from "lucide-react";
import { clsx } from "clsx";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Contact",  href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const transparent = isHome && !scrolled;

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          transparent
            ? "bg-transparent"
            : "bg-plum-surface/80 backdrop-blur-2xl shadow-nav border-b border-[rgba(203,160,198,0.15)]"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className={clsx(
                "flex items-center justify-center w-8 h-8 rounded-lg",
                transparent ? "bg-white/20" : "bg-plum-primary"
              )}>
                <Package2 className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <span className={clsx(
                "font-display font-bold text-lg",
                transparent ? "text-white" : "text-plum-on-surface"
              )}>
                SunnyPlaste<span className={clsx(
                  "font-normal text-sm ml-0.5",
                  transparent ? "text-white/70" : "text-plum-on-surface-variant"
                )}> UK</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "nav-link",
                    transparent && "!text-white/90 hover:!text-white after:!bg-white",
                    pathname === link.href && "active"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:+441212345678"
                className={clsx(
                  "flex items-center gap-1.5 text-sm font-medium transition-colors",
                  transparent ? "text-white/80 hover:text-white" : "text-plum-on-surface-variant hover:text-plum-primary"
                )}
              >
                <Phone className="w-3.5 h-3.5" />
                +44 121 234 5678
              </a>
              <Button
                href="/contact"
                size="sm"
                variant={transparent ? "white" : "primary"}
              >
                Request a Quote
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={clsx(
                "md:hidden p-2 rounded-lg transition-colors",
                transparent
                  ? "text-white hover:bg-white/10"
                  : "text-plum-on-surface-variant hover:bg-plum-surface-low"
              )}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={clsx(
          "fixed inset-0 z-40 md:hidden transition-opacity duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-plum-on-surface/50" onClick={() => setMobileOpen(false)} />
        <nav className={clsx(
          "absolute top-0 right-0 h-full w-72 bg-plum-surface shadow-2xl transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="p-6 pt-20">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                    pathname === link.href
                      ? "bg-plum-surface-low text-plum-primary"
                      : "text-plum-on-surface-variant hover:bg-plum-surface-low hover:text-plum-primary"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-[rgba(203,160,198,0.20)] space-y-3">
              <a
                href="tel:+441212345678"
                className="flex items-center gap-2 text-sm text-plum-on-surface-variant hover:text-plum-primary"
              >
                <Phone className="w-4 h-4" />
                +44 121 234 5678
              </a>
              <Button href="/contact" className="w-full justify-center">
                Request a Quote
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
