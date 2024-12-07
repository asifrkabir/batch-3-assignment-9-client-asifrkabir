/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createProductCategory,
  getAllProductCategories,
} from "@/services/ProductCategoryService";
import { IQueryParam } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ICreateProductCategory } from "./../types/productCategory.type";

export const getAllProductCategoriesQuery = (params?: IQueryParam[]) => ({
  queryKey: ["PRODUCT_CATEGORIES", params],
  queryFn: async () => await getAllProductCategories(params),
});

export const useGetAllProductCategories = (params?: IQueryParam[]) => {
  return useQuery({
    ...getAllProductCategoriesQuery(params),
  });
};

export const useCreateProductCategory = () => {
  return useMutation<any, Error, ICreateProductCategory>({
    mutationFn: createProductCategory,
  });
};
