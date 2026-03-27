import { clsx } from "clsx";

interface SectionHeaderProps {
  eyebrow?: string;
  headline: string;
  subtext?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  headline,
  subtext,
  align = "center",
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={clsx(align === "center" ? "text-center" : "text-left", "mb-12", className)}>
      {eyebrow && (
        <p className={clsx(
          "text-xs font-bold uppercase tracking-[0.15em] mb-3",
          light ? "text-white/70" : "text-plum-primary"
        )}>
          {eyebrow}
        </p>
      )}
      <h2 className={clsx(
        "font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight",
        light ? "text-white" : "text-plum-on-surface"
      )}>
        {headline}
      </h2>
      {subtext && (
        <p className={clsx(
          "mt-4 text-lg max-w-2xl leading-relaxed",
          align === "center" && "mx-auto",
          light ? "text-white/75" : "text-plum-on-surface-variant"
        )}>
          {subtext}
        </p>
      )}
    </div>
  );
}
