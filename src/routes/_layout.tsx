import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/home/SiteHeader";
import { SiteFooter } from "@/components/home/SiteFooter";
import { MobileActionBar } from "@/components/home/MobileActionBar";

export const Route = createFileRoute("/_layout")({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <div className="min-h-screen bg-background pb-28 sm:pb-0">
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
      <MobileActionBar />
      <Toaster />
    </div>
  );
}
