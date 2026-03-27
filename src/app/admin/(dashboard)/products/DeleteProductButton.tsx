"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface Props { id: string; name: string; }

export default function DeleteProductButton({ id, name }: Props) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);

  async function handleDelete() {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  }

  if (confirming) {
    return (
      <span className="flex items-center gap-1.5">
        <button
          onClick={handleDelete}
          className="text-red-600 font-semibold text-xs hover:underline"
        >
          Confirm
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-steel-400 text-xs hover:underline"
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-steel-400 hover:text-red-500 transition-colors"
      title={`Delete ${name}`}
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
