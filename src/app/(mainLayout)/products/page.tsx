import Products from "@/components/product/Products";

const ProductsPage = () => {
  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-lg font-semibold md:text-2xl">All Products</h1>
      </div>
      <Products />
    </div>
  );
};

export default ProductsPage;
