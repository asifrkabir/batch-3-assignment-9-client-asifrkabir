import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VendorAnalytics from "./Analytics/VendorAnalytics";

export default function Analytics() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between space-y-2"></div>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <VendorAnalytics />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 md:col-span-7">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>You made 265 sales this month.</CardDescription>
            </CardHeader>
            <CardContent>{/* <RecentSales /> */}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
