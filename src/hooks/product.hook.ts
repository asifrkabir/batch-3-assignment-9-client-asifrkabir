/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  deleteProduct,
  getAllProducts,
  getAllProductsForFeed,
} from "@/services/ProductService";
import { IApiResponse, IProduct, IQueryParam } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { toast } from "sonner";

export const getAllProductsQuery = (params?: IQueryParam[]) => ({
  queryKey: ["PRODUCTS", params],
  queryFn: async () => await getAllProducts(params),
});

export const useGetAllProducts = (params?: IQueryParam[]) => {
  return useQuery({
    ...getAllProductsQuery(params),
  });
};

export const getAllProductsForFeedQuery = (params?: IQueryParam[]) => ({
  queryKey: ["PRODUCTS", "FEED", params],
  queryFn: async () => await getAllProductsForFeed(params),
});

export const useGetAllProductsForFeed = (params?: IQueryParam[]) => {
  return useQuery({
    ...getAllProductsForFeedQuery(params),
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: deleteProduct,
    onSuccess: (res: IApiResponse<IProduct>) => {
      if (res.statusCode === httpStatus.OK) {
        toast.success("Product deleted successfully");

        queryClient.invalidateQueries({
          queryKey: ["PRODUCTS"],
        });
      } else {
        console.error(res);
        toast.error(
          res.message || "Failed to delete product. Please try again."
        );
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        error.message || "Failed to delete product. Please try again."
      );
    },
  });
};
