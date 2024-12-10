"use client";

import { useGetAllProductCategories } from "@/hooks/productCategory.hook";
import { IProductCategory } from "@/types";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Marquee from "react-fast-marquee";
const ProductCategories = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useGetAllProductCategories([
    { name: "limit", value: 10000 },
  ]);

  if (isLoading) {
    return <Loader2 className="h-4 w-4 animate-spin" />;
  }

  if (isError) {
    return <p>Something went wrong while fetching product categories.</p>;
  }

  const productCategories: IProductCategory[] = data?.data || [];

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/products?category=${categoryId}`);
  };

  return (
    <div className="my-8">
      <Marquee gradient={false} pauseOnHover speed={100}>
        {productCategories.map((category) => (
          <div
            key={category._id}
            className="inline-block mx-4 p-4 border rounded-lg bg-white shadow-sm hover:shadow-md cursor-pointer"
            onClick={() => handleCategoryClick(category._id)}
          >
            <p className="text-center font-medium text-sm md:text-base">
              {category.name}
            </p>
          </div>
        ))}
        {productCategories.map((category) => (
          <div
            key={category._id}
            className="inline-block mx-4 p-4 border rounded-lg bg-white shadow-sm hover:shadow-md cursor-pointer"
            onClick={() => handleCategoryClick(category._id)}
          >
            <p className="text-center font-medium text-sm md:text-base">
              {category.name}
            </p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ProductCategories;
