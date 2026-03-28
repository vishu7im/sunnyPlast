import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { CATEGORY_LABELS } from "@/lib/constants";
import type { Metadata } from "next";
import DeleteProductButton from "./DeleteProductButton";

export const metadata: Metadata = { title: "Products" };

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-navy-900 text-2xl">Products</h1>
          <p className="text-steel-500 text-sm mt-1">{products.length} product{products.length !== 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-navy-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-navy-700 transition-colors text-sm"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-steel-200 overflow-hidden">
        {products.length === 0 ? (
          <div className="text-center py-16 text-steel-400">
            No products yet. <Link href="/admin/products/new" className="text-navy-600 hover:underline">Add your first product.</Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-steel-50 border-b border-steel-200">
              <tr>
                <th className="px-5 py-3.5 text-left font-semibold text-steel-500 uppercase tracking-wide text-xs">Product</th>
                <th className="px-5 py-3.5 text-left font-semibold text-steel-500 uppercase tracking-wide text-xs">Category</th>
                <th className="px-5 py-3.5 text-left font-semibold text-steel-500 uppercase tracking-wide text-xs">MOQ</th>
                <th className="px-5 py-3.5 text-left font-semibold text-steel-500 uppercase tracking-wide text-xs">Featured</th>
                <th className="px-5 py-3.5 text-right font-semibold text-steel-500 uppercase tracking-wide text-xs">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-steel-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-steel-100 overflow-hidden flex-shrink-0">
                        {p.thumbnailImage && (
                          <img src={p.thumbnailImage} alt="" className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-navy-900">{p.name}</p>
                        <p className="text-steel-400 text-xs">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-steel-600">
                    {CATEGORY_LABELS[p.category] || p.category}
                  </td>
                  <td className="px-5 py-4 text-steel-600">{p.specifications.moq}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${p.isFeatured ? "bg-green-100 text-green-700" : "bg-steel-100 text-steel-500"}`}>
                      {p.isFeatured ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="text-navy-600 font-medium hover:underline text-sm"
                      >
                        Edit
                      </Link>
                      <DeleteProductButton id={p.id} name={p.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
