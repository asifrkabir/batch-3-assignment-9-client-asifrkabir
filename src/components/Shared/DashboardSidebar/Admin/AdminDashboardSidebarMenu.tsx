"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import {
  House,
  LayoutDashboard,
  ListTodo,
  type LucideIcon,
  Users,
} from "lucide-react";
import DashboardSidebarMenuItemDropdown from "../DashboardSidebarMenuItemDropdown";
import DashboardSidebarMenuItemSingle from "../DashboardSidebarMenuItemSingle";

interface IMenuItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
}

const items: IMenuItem[] = [
  {
    title: "Home",
    url: "/",
    icon: House,
  },
  {
    title: "Dashboard",
    url: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Categories",
    url: "/admin-dashboard/categories",
    icon: ListTodo,
  },
  {
    title: "Users",
    url: "/admin-dashboard/users",
    icon: Users,
  },
];

export function AdminDashboardSidebarMenu() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) =>
          item.items ? (
            <DashboardSidebarMenuItemDropdown key={item.title} item={item} />
          ) : (
            <DashboardSidebarMenuItemSingle key={item.title} item={item} />
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
