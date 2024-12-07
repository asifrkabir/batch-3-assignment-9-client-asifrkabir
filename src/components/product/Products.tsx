"use client";

import { useGetAllProductsForFeed } from "@/hooks/product.hook";
import { IProduct } from "@/types";
import ProductCard from "./ProductCard";
import ProductCardLoadingSkeleton from "./ProductCardLoadingSkeleton";

const Products = () => {
  const { data, isLoading, isError } = useGetAllProductsForFeed();

  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <ProductCardLoadingSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <p>Something went wrong while fetching products.</p>;
  }

  const products: IProduct[] = data?.data || [];

  return (
    <>
      {products.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1 text-center my-40">
          <h3 className="text-2xl font-bold tracking-tight">
            No products are available right now
          </h3>
          <p className="text-sm text-muted-foreground">
            Please check back later.
          </p>
        </div>
      )}
    </>
  );
};

export default Products;
