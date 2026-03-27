import AnimatedCounter from "@/components/ui/AnimatedCounter";
import type { Stat } from "@/types";

interface TrustBarProps {
  stats: Stat[];
}

export default function TrustBar({ stats }: TrustBarProps) {
  return (
    <section className="bg-plum-surface-low py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center flex flex-col items-center gap-1.5"
            >
              <p className="font-display font-bold text-3xl md:text-4xl text-plum-on-surface">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-plum-on-surface-variant text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
