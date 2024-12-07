/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllProductsForFeed } from "@/services/ProductService";
import { IQueryParam } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const getAllProductsForFeedQuery = (params?: IQueryParam[]) => ({
  queryKey: ["PRODUCTS", "FEED", params],
  queryFn: async () => await getAllProductsForFeed(params),
});

export const useGetAllProductsForFeed = (params?: IQueryParam[]) => {
  return useQuery({
    ...getAllProductsForFeedQuery(params),
  });
};
