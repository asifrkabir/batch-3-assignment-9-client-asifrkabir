"use client";

import RecentOrdersCard from "@/components/analytics/RecentOrdersCard";
import TotalOrdersCard from "@/components/analytics/TotalOrdersCard";
import TotalRevenueCard from "@/components/analytics/TotalRevenueCard";
import { useShop } from "@/context/shop.provider";

const VendorAnalytics = () => {
  const { shop } = useShop();

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TotalRevenueCard shopId={shop._id} />
        <TotalOrdersCard shopId={shop._id} />
      </div>
      <div>
        <RecentOrdersCard shopId={shop._id} />
      </div>
    </>
  );
};

export default VendorAnalytics;
