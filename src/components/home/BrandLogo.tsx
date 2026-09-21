import { useEffect, useState } from "react";
import { SHOP } from "./shop";

const LOGO_SRC = "/norwood-gulf-logo.png";

/**
 * Matches the real norwoodgulf.com header lockup: the Gulf roundel plus a bold,
 * uppercase, tracked-out "Norwood Gulf" wordmark beside it — always both, not
 * just as a loading fallback. The mark is preloaded via an off-DOM `Image` and
 * only swapped in once it actually decodes, so a slow load never flashes a
 * broken-image box; until then a plain gradient badge holds the icon's place.
 */
export function BrandLogo({
  className = "h-10 sm:h-12",
  glow = false,
}: {
  className?: string;
  /** Switches the wordmark to white with a soft halo so it stays legible over a dark photo background. */
  glow?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.src = LOGO_SRC;
    return () => {
      img.onload = null;
    };
  }, []);

  return (
    <span className="flex min-w-0 shrink-0 items-center gap-2.5">
      {loaded ? (
        <img
          src={LOGO_SRC}
          alt="Norwood Gulf"
          className={`w-auto shrink-0 object-contain ${className}`}
          style={
            glow
              ? {
                  filter:
                    "drop-shadow(0 1px 10px rgb(255 255 255 / 0.6)) drop-shadow(0 6px 18px rgb(0 0 0 / 0.4))",
                }
              : undefined
          }
        />
      ) : (
        <span
          aria-hidden="true"
          className={`brand-gradient grid shrink-0 aspect-square place-items-center rounded-full font-display font-extrabold text-primary-foreground ${className}`}
        >
          N
        </span>
      )}
      <span
        className={`truncate font-display text-base font-extrabold uppercase leading-none tracking-[0.03em] sm:text-lg ${
          glow ? "text-white" : "text-foreground"
        }`}
      >
        {SHOP.name}
      </span>
    </span>
  );
}
