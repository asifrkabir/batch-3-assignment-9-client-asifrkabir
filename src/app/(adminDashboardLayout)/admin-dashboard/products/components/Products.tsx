"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useGetAllUsers } from "@/hooks/user.hook";
import { IProduct, IUser } from "@/types";
import { columns } from "./data-table/columns";
import { ProductDataTable } from "./data-table/data-table";
import { useGetAllProducts } from "@/hooks/product.hook";

const Products = () => {
  const { data, isLoading, isError } = useGetAllProducts();

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching products.</p>;
  }

  const products: IProduct[] = data?.data || [];

  return (
    <>
      <ProductDataTable data={products} columns={columns} />
    </>
  );
};

export default Products;
