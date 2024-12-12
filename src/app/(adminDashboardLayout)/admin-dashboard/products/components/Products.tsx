"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useGetAllProducts } from "@/hooks/product.hook";
import { IProduct } from "@/types";
import { columns } from "./data-table/columns";
import { ProductDataTable } from "./data-table/data-table";
import { useState } from "react";

const Products = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError } = useGetAllProducts([
    { name: "limit", value: pageSize },
    { name: "page", value: page },
  ]);

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching products.</p>;
  }

  const products: IProduct[] = data?.data || [];
  const totalRows = data?.meta?.total || 0;

  return (
    <>
      <ProductDataTable
        data={products}
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

export default Products;
