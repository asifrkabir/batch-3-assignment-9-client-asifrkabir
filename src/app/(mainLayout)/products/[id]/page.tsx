"use client";

import { useGetProductById } from "@/hooks/product.hook";
import { useParams } from "next/navigation";
import ProductDetails from "./components/ProductDetails";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
import Reviews from "./components/Review/Reviews";
import { Separator } from "@/components/ui/separator";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const {
    data: productData,
    error,
    isLoading,
  } = useGetProductById(id as string);

  if (isLoading) return <LoadingSpinner />;
  if (error || !productData?.data)
    return (
      <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            No product found
          </h3>
        </div>
      </div>
    );

  const product = productData?.data;

  return (
    <div className="h-full flex-1 flex-col p-8 md:flex">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Product Details</h1>
      </div>
      <ProductDetails product={product} />

      <div className="mb-10 mt-32">
        <Separator />
        <h2 className="text-xl text-center mt-4">Reviews</h2>
      </div>

      <Reviews productId={id as string} />
    </div>
  );
};

export default ProductDetailsPage;
