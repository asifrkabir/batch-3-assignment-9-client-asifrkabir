"use client";

import TotalRevenueCard from "@/components/analytics/TotalRevenueCard";
import TotalUsersCard from "@/components/analytics/TotalUsersCard";

const AdminAnalytics = () => {
  return (
    <>
      <TotalRevenueCard />
      <TotalUsersCard />
    </>
  );
};

export default AdminAnalytics;
