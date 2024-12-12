"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useGetAllPayments } from "@/hooks/payment.hook";
import { IPayment } from "@/types";
import { columns } from "./data-table/columns";
import { PaymentDataTable } from "./data-table/data-table";
import { useState } from "react";

const Payments = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError } = useGetAllPayments([
    { name: "limit", value: pageSize },
    { name: "page", value: page },
  ]);

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching payments.</p>;
  }

  const payments: IPayment[] = data?.data || [];
  const totalRows = data?.meta?.total || 0;

  return (
    <>
      <PaymentDataTable
        data={payments}
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

export default Payments;
