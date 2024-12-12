"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useGetAllCoupons } from "@/hooks/coupon.hook";
import { ICoupon } from "@/types";
import { useState } from "react";
import { columns } from "./data-table/columns";
import { CouponDataTable } from "./data-table/data-table";

const Coupons = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError } = useGetAllCoupons([
    { name: "limit", value: pageSize },
    { name: "page", value: page },
  ]);

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching coupons.</p>;
  }

  const coupons: ICoupon[] = data?.data || [];
  const totalRows = data?.meta?.total || 0;

  return (
    <>
      <CouponDataTable
        data={coupons}
        columns={columns}
        pagination={{
          page,
          pageSize,
          totalRows: totalRows,
          onPageChange: setPage,
          onPageSizeChange: setPageSize,
        }}
      />
    </>
  );
};

export default Coupons;
