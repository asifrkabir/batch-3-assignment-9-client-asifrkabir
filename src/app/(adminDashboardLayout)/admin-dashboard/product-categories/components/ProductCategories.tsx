"use client";

import { useGetAllProductCategories } from "@/hooks/productCategory.hook";
import { IProductCategory } from "@/types";
import { ProductCategoryDataTable } from "./data-table/data-table";
import { columns } from "./data-table/columns";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";

const ProductCategories = () => {
  const { data, isLoading, isError } = useGetAllProductCategories();

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching product categories.</p>;
  }

  const productCategories: IProductCategory[] = data?.data || [];

  return (
    <>
      <ProductCategoryDataTable data={productCategories} columns={columns} />
    </>
  );
};

export default ProductCategories;
