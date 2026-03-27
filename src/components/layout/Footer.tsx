import Link from "next/link";
import { Package2, Mail, Phone, MapPin } from "lucide-react";

// Simple LinkedIn SVG since lucide-react version doesn't export it
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const quickLinks = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Contact",  href: "/contact" },
];

const productCategories = [
  { label: "Food Packaging",            href: "/products?category=food-packaging" },
  { label: "Industrial Containers",     href: "/products?category=industrial-containers" },
  { label: "Pharmaceutical Packaging",  href: "/products?category=pharmaceutical-packaging" },
  { label: "Retail Packaging",          href: "/products?category=retail-packaging" },
  { label: "Custom Packaging",          href: "/products?category=custom-packaging" },
];

export default function Footer() {
  return (
    <footer className="bg-[#2d1533] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-plum-primary">
                <Package2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg">
                SunnyPlaste<span className="font-normal text-sm text-white/40"> UK</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Precision plastic packaging for UK industry. ISO 9001 & BRCGS certified manufacturer.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com/company/sunnyplaste"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-plum-primary transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-white/40 mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/50 text-sm hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-white/40 mb-5">
              Products
            </h3>
            <ul className="space-y-3">
              {productCategories.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/50 text-sm hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-white/40 mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-plum-primary-container/50 mt-0.5 flex-shrink-0" />
                <span className="text-white/50 text-sm leading-relaxed">
                  Unit 12, Holt Industrial Estate<br />
                  Birmingham, B6 7AP<br />
                  United Kingdom
                </span>
              </li>
              <li>
                <a href="tel:+441212345678" className="flex items-center gap-3 text-white/50 text-sm hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-plum-primary-container/50 flex-shrink-0" />
                  +44 121 234 5678
                </a>
              </li>
              <li>
                <a href="mailto:enquiries@sunnyplaste.co.uk" className="flex items-center gap-3 text-white/50 text-sm hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-plum-primary-container/50 flex-shrink-0" />
                  enquiries@sunnyplaste.co.uk
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © 2025 SunnyPlaste UK Ltd. All rights reserved. Company No. 12345678.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-white/30 text-xs hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-white/30 text-xs hover:text-white/60 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
