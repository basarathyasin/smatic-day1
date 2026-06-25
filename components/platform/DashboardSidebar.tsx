"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { dashboardNavItems, type DashboardNavItem } from "@/components/platform/dashboard-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  brand?: string;
  items?: DashboardNavItem[];
  footerLabel?: string;
}

export function DashboardSidebar({
  brand = "NextApp",
  items = dashboardNavItems,
  footerLabel = "Todo workspace",
}: DashboardSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="font-heading text-lg font-semibold">
          {brand}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Todo</SidebarGroupLabel>

          <SidebarGroupContent >
            <SidebarMenu className="gap-2" >
              {items.map((item) => {
                const active = isActive(item.href);

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.label}
                      className={cn(
                        "h-10 rounded-lg px-3 font-medium transition-colors hover:bg-[#E6F4FF] hover:text-[#075985]",
                        active &&
                          "bg-[#DBEAFE] text-[#075985] shadow-[inset_3px_0_0_#0284C7]",
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon className="size-4" />
                        <span>{item.label}</span>
                      </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 text-sm text-muted-foreground">
        {footerLabel}
      </SidebarFooter>
    </Sidebar>
  );
}
