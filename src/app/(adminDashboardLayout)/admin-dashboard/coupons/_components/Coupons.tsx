"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useGetAllCoupons } from "@/hooks/coupon.hook";
import { ICoupon, IQueryParam } from "@/types";
import { useState } from "react";
import { columns } from "./data-table/columns";
import { CouponDataTable } from "./data-table/data-table";

const Coupons = () => {
  const [params] = useState<IQueryParam[]>([]);

  const { data, isLoading, isError } = useGetAllCoupons(params);

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching coupons.</p>;
  }

  const coupons: ICoupon[] = data?.data || [];

  return (
    <>
      <CouponDataTable data={coupons} columns={columns} />
    </>
  );
};

export default Coupons;
