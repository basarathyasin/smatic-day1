import Link from "next/link";

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

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild tooltip={item.label}>
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
