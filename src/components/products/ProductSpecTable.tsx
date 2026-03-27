import type { ProductSpecifications } from "@/types";

interface ProductSpecTableProps {
  specs: ProductSpecifications;
}

export default function ProductSpecTable({ specs }: ProductSpecTableProps) {
  const rows = [
    { label: "Material", value: specs.material },
    { label: "Thickness", value: specs.thickness },
    { label: "Dimensions", value: specs.dimensions },
    specs.temperature && { label: "Temperature Range", value: specs.temperature },
    { label: "Minimum Order Qty", value: specs.moq },
    { label: "Lead Time", value: specs.leadTime },
    { label: "Available Colours", value: specs.colors.join(", ") },
    { label: "Compliance", value: specs.compliance.join(", ") },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="overflow-hidden rounded-xl border border-[rgba(203,160,198,0.20)]">
      <table className="w-full text-sm font-mono">
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? "bg-plum-surface-low" : "bg-plum-surface"}>
              <td className="px-5 py-3.5 font-semibold text-plum-on-surface w-1/3 border-r border-[rgba(203,160,198,0.15)]">
                {row.label}
              </td>
              <td className="px-5 py-3.5 text-plum-on-surface-variant">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
