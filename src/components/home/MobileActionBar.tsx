import { CalendarDays, Phone } from "lucide-react";
import { SHOP } from "./shop";
import { BookAppointmentDialog } from "./BookAppointmentDialog";
import { OpenStatus } from "./OpenStatus";

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl sm:hidden">
      <div className="flex items-center justify-center px-4 pt-2">
        <OpenStatus />
      </div>
      <div className="grid grid-cols-2 gap-2 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2">
        <a
          href={`tel:${SHOP.phone}`}
          className="inline-flex min-w-0 items-center justify-center gap-2 rounded-full border border-border py-3.5 text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Phone className="h-4 w-4 shrink-0" />
          Call
        </a>
        <BookAppointmentDialog
          trigger={
            <button
              type="button"
              className="brand-gradient inline-flex min-w-0 items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <CalendarDays className="h-4 w-4 shrink-0" />
              Book now
            </button>
          }
        />
      </div>
    </div>
  );
}
