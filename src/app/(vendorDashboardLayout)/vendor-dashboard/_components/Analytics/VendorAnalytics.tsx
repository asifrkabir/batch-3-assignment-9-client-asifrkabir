"use client";

import TotalRevenueCard from "@/components/analytics/TotalRevenueCard";
import { useShop } from "@/context/shop.provider";

const VendorAnalytics = () => {
  const { shop } = useShop();

  return (
    <>
      <TotalRevenueCard shopId={shop._id} />
    </>
  );
};

export default VendorAnalytics;
