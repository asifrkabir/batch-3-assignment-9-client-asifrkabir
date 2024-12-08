import DashboardNavbar from "@/components/Shared/DashboardNavbar/DashboardNavbar";
import VendorDashboardSidebar from "@/components/Shared/DashboardSidebar/Vendor/VendorDashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function VendorDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider>
        <VendorDashboardSidebar />
        <main className="w-full">
          <DashboardNavbar />
          <div className="p-4 lg:p-6">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}
