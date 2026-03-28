import { getContent } from "@/lib/content";
import type { Metadata } from "next";
import ContentEditor from "@/components/admin/ContentEditor";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Site Content" };

export default async function AdminContentPage() {
  const content = await getContent();

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display font-bold text-navy-900 text-2xl">Site Content</h1>
        <p className="text-steel-500 text-sm mt-1">
          Edit homepage and site-wide content. Changes take effect immediately.
        </p>
      </div>
      <ContentEditor content={content} />
    </div>
  );
}
