import Products from "@/components/product/Products";
import { Suspense } from "react";
import Banner from "./components/Banner";
import ProductCategories from "./components/ProductCategories";

export default function HomePage() {
  return (
    <div className="h-full flex-1 flex-col p-8 md:flex">
      <div className="mb-20">
        <Banner />
      </div>

      <div className="flex items-center justify-center mb-8">
        <h1 className="text-lg font-semibold md:text-2xl text-center">
          Browse through countless product categories
        </h1>
      </div>
      <ProductCategories />

      <div className="flex items-center justify-center mb-8 mt-20">
        <h1 className="text-lg font-semibold md:text-2xl">Products</h1>
      </div>
      <Suspense>
        <Products />
      </Suspense>
    </div>
  );
}
