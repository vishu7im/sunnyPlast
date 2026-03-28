"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

export default function DemoGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("admin_demo_auth") !== "1") {
      router.replace("/admin/login");
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) return null;

  return (
    <>
      <div className="bg-amber-50 border-b border-amber-200 px-5 py-2.5 flex items-center gap-2 text-amber-800 text-sm">
        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
        <span>
          <strong>Demo mode</strong> — This is a read-only preview. Changes cannot be saved on static hosting.
          Run <code className="bg-amber-100 px-1 rounded text-xs">npm run dev</code> locally for full admin access.
        </span>
      </div>
      {children}
    </>
  );
}
