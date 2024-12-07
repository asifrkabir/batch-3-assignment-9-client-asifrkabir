/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllProductCategories } from "@/services/ProductCategoryService";
import { IQueryParam } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const getAllProductCategoriesQuery = (params?: IQueryParam[]) => ({
  queryKey: ["PRODUCT_CATEGORIES", params],
  queryFn: async () => await getAllProductCategories(params),
});

export const useGetAllProductCategories = (params?: IQueryParam[]) => {
  return useQuery({
    ...getAllProductCategoriesQuery(params),
  });
};
