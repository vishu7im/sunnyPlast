import AdminSidebar from "@/components/admin/AdminSidebar";
import DemoGuard from "@/components/admin/DemoGuard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | SunnyPlaste Admin" },
  robots: { index: false, follow: false },
};

const isDemo = process.env.NEXT_PUBLIC_STATIC_DEMO === "true";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const content = (
    <div className="flex min-h-screen bg-steel-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );

  if (isDemo) {
    return <DemoGuard>{content}</DemoGuard>;
  }

  return content;
}
