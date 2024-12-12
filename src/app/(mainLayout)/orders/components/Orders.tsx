"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useUser } from "@/context/user.provider";
import { useGetAllOrders } from "@/hooks/order.hook";
import { IOrder, IQueryParam } from "@/types";
import { useEffect, useState } from "react";
import { columns } from "./data-table/columns";
import { OrderDataTable } from "./data-table/data-table";

const Orders = () => {
  const { user, isLoading: isUserLoading } = useUser();
  const [params, setParams] = useState<IQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading: isOrdersLoading, isError } = useGetAllOrders(params);

  useEffect(() => {
    if (user?.userId) {
      setParams([
        { name: "user", value: user.userId },
        { name: "limit", value: pageSize },
        { name: "page", value: page },
      ]);
    }
  }, [user, page, pageSize]);

  if (isUserLoading || !user?.userId || isOrdersLoading) {
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
