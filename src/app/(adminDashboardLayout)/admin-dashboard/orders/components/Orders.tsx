"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useGetAllOrders } from "@/hooks/order.hook";
import { IOrder } from "@/types";
import { columns } from "./data-table/columns";
import { OrderDataTable } from "./data-table/data-table";
import { useState } from "react";

const Orders = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError } = useGetAllOrders([
    { name: "limit", value: pageSize },
    { name: "page", value: page },
  ]);

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching orders.</p>;
  }

  const orders: IOrder[] = data?.data || [];
  const totalRows = data?.meta?.total || 0;

  return (
    <>
      <OrderDataTable
        data={orders}
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

export default Orders;
