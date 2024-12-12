"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useGetAllShops } from "@/hooks/shop.hook";
import { IShop } from "@/types";
import { columns } from "./data-table/columns";
import { ShopDataTable } from "./data-table/data-table";
import { useState } from "react";

const Shops = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError } = useGetAllShops([
    { name: "limit", value: pageSize },
    { name: "page", value: page },
  ]);

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching shops.</p>;
  }

  const shops: IShop[] = data?.data || [];
  const totalRows = data?.meta?.total || 0;

  return (
    <>
      <ShopDataTable
        data={shops}
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

export default Shops;
