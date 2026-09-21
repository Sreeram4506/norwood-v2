import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { SHOP } from "./shop";

const STATS = [
  { value: SHOP?.yearsInBusiness || 33, suffix: "+", label: "Years serving Norwood" },
  { value: SHOP?.rating || 4.6, decimals: 1, suffix: "★", label: "Google rating" },
  { value: SHOP?.satisfaction || 98, suffix: "%", label: "Customer satisfaction" },
  { value: SHOP?.founded || 1993, label: "Family-run since", raw: true },
];

function useCountUp(target: number, run: boolean, decimals = 0) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? target : 0);

  useEffect(() => {
    if (!run || reduce) {
      setValue(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1400);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Number((target * eased).toFixed(decimals)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, run, reduce, decimals]);

  return value;
}

function Stat({
  value,
  label,
  suffix,
  decimals = 0,
  raw = false,
  run,
}: {
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
  raw?: boolean;
  run: boolean;
}) {
  const animated = useCountUp(value, run && !raw, decimals);
  const shown = raw ? value : animated;

  return (
    <div className="px-6 py-8 text-center sm:py-10">
      <div className="font-display text-4xl font-extrabold tabular-nums tracking-tight text-foreground sm:text-5xl">
        {shown.toFixed(decimals)}
        {suffix && <span className="text-primary">{suffix}</span>}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section ref={ref} aria-label="Norwood Gulf by the numbers" className="border-b border-border">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-border px-4 sm:px-6 lg:grid-cols-4 lg:divide-y-0">
        {STATS.map((s) => (
          <Stat key={s.label} {...s} run={inView} />
        ))}
      </div>
    </section>
  );
}
