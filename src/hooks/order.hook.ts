/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllOrders } from "@/services/OrderService";
import { IQueryParam } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const getAllOrdersQuery = (params?: IQueryParam[]) => ({
  queryKey: ["ORDERS", params],
  queryFn: async () => await getAllOrders(params),
});

export const useGetAllOrders = (params?: IQueryParam[]) => {
  return useQuery({
    ...getAllOrdersQuery(params),
  });
};
