"use client";

import InfiniteScrollContainer from "@/components/Shared/InfiniteScrollContainer";
import { useGetAllProductsForFeedInfinite } from "@/hooks/product.hook";
import ProductCard from "./ProductCard";
import ProductCardLoadingSkeleton from "./ProductCardLoadingSkeleton";

const Products = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetAllProductsForFeedInfinite([{ name: "limit", value: 9 }]);

  const products = data?.pages.flatMap((page) => page.data || []) || [];

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

  if (products.length <= 0) {
    return (
      <div className="flex flex-col items-center gap-1 text-center my-40">
        <h3 className="text-2xl font-bold tracking-tight">
          No products are available right now
        </h3>
        <p className="text-sm text-muted-foreground">
          Please check back later.
        </p>
      </div>
    );
  }

  return (
    <InfiniteScrollContainer
      className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      onBottomReached={() => hasNextPage && fetchNextPage()}
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
      {isFetchingNextPage && (
        <div className="col-span-full text-center">
          <ProductCardLoadingSkeleton />
        </div>
      )}
    </InfiniteScrollContainer>
  );
};

export default Products;
