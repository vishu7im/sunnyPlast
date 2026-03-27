"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2, Send } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import type { RFQFormData } from "@/types";
import Button from "@/components/ui/Button";

export default function RFQForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RFQFormData>();

  async function onSubmit(data: RFQFormData) {
    // No-backend: simulate submission
    await new Promise((r) => setTimeout(r, 800));
    console.log("RFQ submission:", data);
    setSubmitted(true);
    reset();
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
        <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="font-display font-bold text-plum-on-surface text-xl mb-2">
          Quote Request Received
        </h3>
        <p className="text-plum-on-surface-variant text-sm leading-relaxed">
          Thank you for your enquiry. Our team will review your requirements and respond within 1 business day.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-5 text-plum-primary text-sm font-semibold hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-plum-on-surface mb-1.5">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            placeholder="Jane Smith"
            className="w-full px-4 py-3 rounded-xl bg-plum-surface-low border-0 text-plum-on-surface placeholder-plum-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-plum-primary focus:bg-plum-surface-highest text-sm transition-all"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-semibold text-plum-on-surface mb-1.5">
            Company <span className="text-red-400">*</span>
          </label>
          <input
            {...register("company", { required: "Company is required" })}
            type="text"
            placeholder="Acme Ltd"
            className="w-full px-4 py-3 rounded-xl bg-plum-surface-low border-0 text-plum-on-surface placeholder-plum-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-plum-primary focus:bg-plum-surface-highest text-sm transition-all"
          />
          {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-plum-on-surface mb-1.5">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
            })}
            type="email"
            placeholder="jane@acme.co.uk"
            className="w-full px-4 py-3 rounded-xl bg-plum-surface-low border-0 text-plum-on-surface placeholder-plum-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-plum-primary focus:bg-plum-surface-highest text-sm transition-all"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-plum-on-surface mb-1.5">
            Phone Number
          </label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="+44 7700 900000"
            className="w-full px-4 py-3 rounded-xl bg-plum-surface-low border-0 text-plum-on-surface placeholder-plum-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-plum-primary focus:bg-plum-surface-highest text-sm transition-all"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-plum-on-surface mb-1.5">
            Product Category
          </label>
          <select
            {...register("productCategory")}
            className="w-full px-4 py-3 rounded-xl bg-plum-surface-low border-0 text-plum-on-surface focus:outline-none focus:ring-2 focus:ring-plum-primary focus:bg-plum-surface-highest text-sm transition-all"
          >
            <option value="">Select a category</option>
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-semibold text-plum-on-surface mb-1.5">
            Estimated Quantity
          </label>
          <input
            {...register("quantity")}
            type="text"
            placeholder="e.g. 10,000 units/month"
            className="w-full px-4 py-3 rounded-xl bg-plum-surface-low border-0 text-plum-on-surface placeholder-plum-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-plum-primary focus:bg-plum-surface-highest text-sm transition-all"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-semibold text-plum-on-surface mb-1.5">
          Requirements / Message <span className="text-red-400">*</span>
        </label>
        <textarea
          {...register("message", { required: "Please describe your requirements" })}
          rows={5}
          placeholder="Describe your packaging requirements — dimensions, materials, volumes, timeline..."
          className="w-full px-4 py-3 rounded-xl bg-plum-surface-low border-0 text-plum-on-surface placeholder-plum-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-plum-primary focus:bg-plum-surface-highest text-sm transition-all resize-none"
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <Button
        type="submit"
        loading={isSubmitting}
        size="lg"
        className="w-full justify-center"
      >
        <Send className="w-4 h-4" />
        Submit Request
      </Button>

      <p className="text-plum-on-surface-variant/60 text-xs text-center">
        We respond within 1 business day. Your details will not be shared with third parties.
      </p>
    </form>
  );
}
