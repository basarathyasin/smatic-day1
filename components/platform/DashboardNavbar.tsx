import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface DashboardNavbarProps {
  title?: string;
  subtitle?: string;
}

export function DashboardNavbar({
  title = "Dashboard",
  subtitle = "Plan today, finish what matters.",
}: DashboardNavbarProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-sidebar-border bg-background px-4 md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarTrigger />

        <div className="min-w-0">
          <h1 className="truncate font-heading text-base font-semibold text-[#191C1D] dark:text-white">
            {title}
          </h1>

          <p className="hidden text-sm text-muted-foreground sm:block">
            {subtitle}
          </p>
        </div>
      </div>

      <ThemeToggle />
    </header>
  );
}
