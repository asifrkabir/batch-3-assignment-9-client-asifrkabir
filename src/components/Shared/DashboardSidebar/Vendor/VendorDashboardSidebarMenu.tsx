"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import {
  CircleDollarSign,
  House,
  LayoutDashboard,
  ListTodo,
  Logs,
  type LucideIcon,
  Store,
  Users,
  Boxes,
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
    url: "/vendor-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Product Categories",
    url: "/vendor-dashboard/product-categories",
    icon: ListTodo,
  },
  {
    title: "Users",
    url: "/vendor-dashboard/users",
    icon: Users,
  },
  {
    title: "Shops",
    url: "/vendor-dashboard/shops",
    icon: Store,
  },
  {
    title: "Products",
    url: "/vendor-dashboard/products",
    icon: Boxes,
  },
  {
    title: "Payments",
    url: "/vendor-dashboard/payments",
    icon: CircleDollarSign,
  },
  {
    title: "Orders",
    url: "/vendor-dashboard/orders",
    icon: Logs,
  },
];

export function VendorDashboardSidebarMenu() {
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
