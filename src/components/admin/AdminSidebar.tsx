"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Package2, LayoutGrid, FileText, LogOut, Home } from "lucide-react";
import { clsx } from "clsx";

const navLinks = [
  { label: "Products",        href: "/admin/products",  icon: LayoutGrid },
  { label: "Site Content",    href: "/admin/content",   icon: FileText },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside className="w-60 bg-navy-950 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-navy-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-navy-600 flex items-center justify-center">
            <Package2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-display font-bold text-white text-sm">SunnyPlaste</p>
            <p className="text-navy-500 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3">
        <p className="text-navy-600 text-xs font-bold uppercase tracking-widest px-3 mb-3 mt-2">
          Manage
        </p>
        <div className="space-y-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                pathname.startsWith(link.href)
                  ? "bg-navy-700 text-white"
                  : "text-navy-400 hover:bg-navy-800 hover:text-white"
              )}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-navy-800 space-y-0.5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-navy-400 hover:bg-navy-800 hover:text-white transition-colors"
        >
          <Home className="w-4 h-4" />
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-navy-400 hover:bg-red-900/30 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
