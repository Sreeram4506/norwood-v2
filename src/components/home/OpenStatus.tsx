import { useEffect, useState } from "react";
import { getOpenStatus } from "./shop";

export function OpenStatus({ light = false }: { light?: boolean }) {
  const [status, setStatus] = useState(() => getOpenStatus());

  useEffect(() => {
    const id = setInterval(() => setStatus(getOpenStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  const dot = light ? "bg-open-on-dark" : "bg-open";

  return (
    <span
      className={`inline-flex items-center gap-2 text-sm font-medium ${
        light ? "text-white/85" : "text-muted-foreground"
      }`}
    >
      <span className="relative grid h-2.5 w-2.5 shrink-0 place-items-center">
        {status.open && (
          <span
            aria-hidden="true"
            className={`absolute h-2.5 w-2.5 animate-ping rounded-full opacity-70 motion-reduce:animate-none ${dot}`}
          />
        )}
        <span
          aria-hidden="true"
          className={`relative h-2 w-2 rounded-full ${
            status.open ? dot : light ? "bg-white/45" : "bg-muted-foreground/50"
          }`}
        />
      </span>
      {status.label}
    </span>
  );
}
