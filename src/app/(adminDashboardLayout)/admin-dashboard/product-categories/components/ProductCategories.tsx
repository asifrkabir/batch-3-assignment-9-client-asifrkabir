"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useGetAllProductCategories } from "@/hooks/productCategory.hook";
import { IProductCategory } from "@/types";
import { useState } from "react";
import { columns } from "./data-table/columns";
import { ProductCategoryDataTable } from "./data-table/data-table";

const ProductCategories = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError } = useGetAllProductCategories([
    { name: "limit", value: pageSize },
    { name: "page", value: page },
  ]);

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching product categories.</p>;
  }

  const productCategories: IProductCategory[] = data?.data || [];
  const totalRows = data?.meta?.total || 0;

  return (
    <>
      <ProductCategoryDataTable
        data={productCategories}
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

export default ProductCategories;
