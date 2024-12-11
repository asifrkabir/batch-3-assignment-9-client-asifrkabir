"use client";

import TotalOrdersCard from "@/components/analytics/TotalOrdersCard";
import TotalRevenueCard from "@/components/analytics/TotalRevenueCard";
import TotalUsersCard from "@/components/analytics/TotalUsersCard";

const AdminAnalytics = () => {
  return (
    <>
      <TotalRevenueCard />
      <TotalUsersCard />
      <TotalOrdersCard />
    </>
  );
};

export default AdminAnalytics;
