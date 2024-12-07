/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createProductCategory,
  deleteProductCategory,
  getAllProductCategories,
  getProductCategoryById,
  updateProductCategory,
} from "@/services/ProductCategoryService";
import { IQueryParam } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ICreateProductCategory,
  IUpdateProductCategory,
} from "./../types/productCategory.type";

export const getAllProductCategoriesQuery = (params?: IQueryParam[]) => ({
  queryKey: ["PRODUCT_CATEGORIES", params],
  queryFn: async () => await getAllProductCategories(params),
});

export const useGetAllProductCategories = (params?: IQueryParam[]) => {
  return useQuery({
    ...getAllProductCategoriesQuery(params),
  });
};

export const getProductCategoryByIdQuery = (id: string) => ({
  queryKey: ["PRODUCT_CATEGORY", id],
  queryFn: async () => await getProductCategoryById(id),
});

export const useGetProductCategoryById = (id: string) => {
  return useQuery({
    ...getProductCategoryByIdQuery(id),
  });
};

export const useCreateProductCategory = () => {
  return useMutation<any, Error, ICreateProductCategory>({
    mutationFn: createProductCategory,
  });
};

export const useUpdateProductCategory = () => {
  return useMutation<any, Error, IUpdateProductCategory>({
    mutationFn: updateProductCategory,
  });
};

export const useDeleteProductCategory = () => {
  return useMutation<any, Error, string>({
    mutationFn: deleteProductCategory,
  });
};
