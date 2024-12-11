import Products from "@/components/product/Products";
import { IQueryParam } from "@/types";

const SalesProducts = () => {
  const customParams: IQueryParam[] = [{ name: "onSale", value: true }];

  return <Products customParams={customParams} />;
};

export default SalesProducts;
