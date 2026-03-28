"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Package2, Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Demo mode: client-side auth (GitHub Pages / static hosting)
    if (process.env.NEXT_PUBLIC_STATIC_DEMO === "true") {
      await new Promise((r) => setTimeout(r, 400));
      if (username === "admin" && password === "demo") {
        localStorage.setItem("admin_demo_auth", "1");
        router.push("/admin/products");
      } else {
        setError('Demo credentials: username "admin", password "demo"');
        setLoading(false);
      }
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin/products");
      } else {
        const data = await res.json();
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-navy-600 flex items-center justify-center">
            <Package2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-display font-bold text-white text-lg">SunnyPlaste</p>
            <p className="text-navy-500 text-xs">Admin Panel</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h1 className="font-display font-bold text-navy-900 text-xl mb-1">Sign In</h1>
          <p className="text-steel-500 text-sm mb-6">Enter your admin credentials</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-navy-800 mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full px-4 py-3 rounded-lg border border-steel-200 text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-800 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-3 pr-10 rounded-lg border border-steel-200 text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-steel-400 hover:text-steel-600"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 text-sm">
                {error}
              </div>
            )}

            <Button type="submit" loading={loading} className="w-full justify-center mt-2">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
