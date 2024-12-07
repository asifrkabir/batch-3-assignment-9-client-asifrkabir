"use client";

import { useGetAllProductCategories } from "@/hooks/productCategory.hook";
import { IProductCategory } from "@/types";
import { ProductCategoryDataTable } from "./data-table/data-table";
import { columns } from "./data-table/columns";

const ProductCategories = () => {
  const { data, isLoading, isError } = useGetAllProductCategories();

  if (isLoading) {
    return <p>Loading...</p>;
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
