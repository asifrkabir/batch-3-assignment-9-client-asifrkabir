"use client";

import { useShop } from "@/context/shop.provider";
import TotalRevenueCard from "./TotalRevenueCard";

const VendorAnalytics = () => {
  const { shop } = useShop();

  return (
    <>
      <TotalRevenueCard shopId={shop._id} />
    </>
  );
};

export default VendorAnalytics;
