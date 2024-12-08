"use client";

import { useGetShopByOwnerId } from "@/hooks/shop.hook";
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";
import { AddShopModal } from "./AddShop/AddShopModal";

const ShopChecker = ({ children }: { children: React.ReactNode }) => {
  const { data: shopData, isLoading, isError } = useGetShopByOwnerId();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p>Failed to load shop information. Please try again later.</p>;
  }

  const shop = shopData?.data;

  if (!shop) {
    return (
      <div className="flex flex-col items-center gap-1 text-center my-40">
        <h3 className="text-2xl font-bold tracking-tight">
          Add your shop details to get started
        </h3>
        <AddShopModal />
      </div>
    );
  }

  return <>{children}</>;
};

export default ShopChecker;
