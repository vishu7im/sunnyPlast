"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Upload, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { PRODUCT_CATEGORIES, INDUSTRY_LABELS } from "@/lib/constants";
import type { Product } from "@/types";

interface ProductFormProps {
  product?: Product;
  mode: "create" | "edit";
}

type FormData = Omit<Product, "id" | "createdAt" | "updatedAt" | "industries" | "tags"> & {
  industriesStr: string;
  tagsStr: string;
};

export default function ProductForm({ product, mode }: ProductFormProps) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>(product?.images || []);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>({
    defaultValues: product
      ? {
          ...product,
          industriesStr: product.industries.join(", "),
          tagsStr: product.tags.join(", "),
        }
      : {
          isFeatured: false,
          isCustom: false,
          specifications: {
            material: "", thickness: "", dimensions: "",
            moq: "", leadTime: "", colors: [], compliance: [],
          },
          seo: { metaTitle: "", metaDescription: "" },
          industriesStr: "",
          tagsStr: "",
        },
  });

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) setImages((prev) => [...prev, data.url]);
      else setError(data.error || "Upload failed");
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function removeImage(url: string) {
    setImages((prev) => prev.filter((i) => i !== url));
  }

  async function onSubmit(data: FormData) {
    setError("");
    const payload = {
      ...data,
      images,
      thumbnailImage: images[0] || "",
      industries: data.industriesStr.split(",").map((s) => s.trim()).filter(Boolean),
      tags: data.tagsStr.split(",").map((s) => s.trim()).filter(Boolean),
      specifications: {
        ...data.specifications,
        colors: typeof data.specifications.colors === "string"
          ? (data.specifications.colors as unknown as string).split(",").map((s) => s.trim())
          : data.specifications.colors,
        compliance: typeof data.specifications.compliance === "string"
          ? (data.specifications.compliance as unknown as string).split(",").map((s) => s.trim())
          : data.specifications.compliance,
      },
    };

    try {
      const url = mode === "edit" ? `/api/products/${product!.id}` : "/api/products";
      const method = mode === "edit" ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const d = await res.json();
        setError(d.error || "Save failed");
        return;
      }

      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Failed to save product");
    }
  }

  const field = "w-full px-3 py-2.5 rounded-lg border border-steel-200 text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm";
  const label = "block text-sm font-semibold text-navy-700 mb-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Basic info */}
      <section className="bg-white rounded-xl border border-steel-200 p-6">
        <h3 className="font-display font-bold text-navy-900 text-base mb-5">Basic Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className={label}>Product Name *</label>
            <input {...register("name", { required: true })} className={field} placeholder="Food-Grade Thermoformed Trays" />
          </div>
          <div>
            <label className={label}>Slug (URL)</label>
            <input {...register("slug")} className={field} placeholder="food-grade-thermoformed-trays" />
          </div>
          <div>
            <label className={label}>Category *</label>
            <select {...register("category", { required: true })} className={field}>
              {PRODUCT_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Short Description *</label>
            <textarea {...register("shortDescription", { required: true })} rows={2} className={field} />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Long Description</label>
            <textarea {...register("longDescription")} rows={5} className={field} />
          </div>
          <div>
            <label className={label}>Industries (comma-separated)</label>
            <input {...register("industriesStr")} className={field} placeholder="food-beverage, retail" />
            <p className="text-xs text-steel-400 mt-1">
              Values: {Object.keys(INDUSTRY_LABELS).join(", ")}
            </p>
          </div>
          <div>
            <label className={label}>Tags (comma-separated)</label>
            <input {...register("tagsStr")} className={field} placeholder="thermoformed, rPET, food-safe" />
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm font-medium text-navy-700 cursor-pointer">
              <input type="checkbox" {...register("isFeatured")} className="rounded" />
              Featured product
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-navy-700 cursor-pointer">
              <input type="checkbox" {...register("isCustom")} className="rounded" />
              Bespoke / custom
            </label>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="bg-white rounded-xl border border-steel-200 p-6">
        <h3 className="font-display font-bold text-navy-900 text-base mb-5">Technical Specifications</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ["Material", "specifications.material"],
            ["Thickness", "specifications.thickness"],
            ["Dimensions", "specifications.dimensions"],
            ["Temperature Range", "specifications.temperature"],
            ["Min. Order Qty", "specifications.moq"],
            ["Lead Time", "specifications.leadTime"],
          ].map(([lbl, key]) => (
            <div key={key}>
              <label className={label}>{lbl}</label>
              <input {...register(key as keyof FormData)} className={field} />
            </div>
          ))}
          <div>
            <label className={label}>Available Colours (comma-separated)</label>
            <input {...register("specifications.colors" as keyof FormData)} className={field} placeholder="Clear, Black, White" />
          </div>
          <div>
            <label className={label}>Compliance (comma-separated)</label>
            <input {...register("specifications.compliance" as keyof FormData)} className={field} placeholder="UK Food Contact Regs, BRCGS" />
          </div>
        </div>
      </section>

      {/* Images */}
      <section className="bg-white rounded-xl border border-steel-200 p-6">
        <h3 className="font-display font-bold text-navy-900 text-base mb-5">Images</h3>
        <div className="flex flex-wrap gap-3 mb-4">
          {images.map((img) => (
            <div key={img} className="relative w-20 h-20 rounded-lg overflow-hidden border border-steel-200 group">
              <img src={img} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(img)}
                className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          {images.length < 5 && (
            <label className="w-20 h-20 rounded-lg border-2 border-dashed border-steel-200 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-navy-400 transition-colors">
              <Upload className="w-5 h-5 text-steel-400" />
              <span className="text-xs text-steel-400">{uploading ? "..." : "Add"}</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
            </label>
          )}
        </div>
        <p className="text-xs text-steel-400">Up to 5 images. JPG, PNG, WebP. Max 5MB each.</p>
      </section>

      {/* SEO */}
      <section className="bg-white rounded-xl border border-steel-200 p-6">
        <h3 className="font-display font-bold text-navy-900 text-base mb-5">SEO</h3>
        <div className="space-y-4">
          <div>
            <label className={label}>Meta Title</label>
            <input {...register("seo.metaTitle")} className={field} />
          </div>
          <div>
            <label className={label}>Meta Description</label>
            <textarea {...register("seo.metaDescription")} rows={2} className={field} />
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button type="submit" loading={isSubmitting}>
          {mode === "edit" ? "Save Changes" : "Create Product"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin/products")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
