/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createShop,
  deleteShop,
  getAllShops,
  getShopById,
  toggleShopBlacklistStatus,
  updateShop,
} from "@/services/ShopService";
import {
  IApiResponse,
  IQueryParam,
  IShop,
  IToggleShopBlacklistStatus,
  IUpdateShop,
} from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { toast } from "sonner";

export const getAllShopsQuery = (params?: IQueryParam[]) => ({
  queryKey: ["SHOPS", params],
  queryFn: async () => await getAllShops(params),
});

export const useGetAllShops = (params?: IQueryParam[]) => {
  return useQuery({
    ...getAllShopsQuery(params),
  });
};

export const getShopByIdQuery = (id: string) => ({
  queryKey: ["SHOP", id],
  queryFn: async () => await getShopById(id),
});

export const useGetShopById = (id: string) => {
  return useQuery({
    ...getShopByIdQuery(id),
  });
};

export const useCreateShop = () => {
  return useMutation<any, Error, FormData>({
    mutationFn: createShop,
  });
};

export const useUpdateShop = () => {
  return useMutation<any, Error, IUpdateShop>({
    mutationFn: updateShop,
  });
};

export const useDeleteShop = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: deleteShop,
    onSuccess: (res: IApiResponse<IShop>) => {
      if (res.statusCode === httpStatus.OK) {
        toast.success("Shop deleted successfully");

        queryClient.invalidateQueries({
          queryKey: ["SHOPS"],
        });
      } else {
        console.error(res);
        toast.error(res.message || "Failed to delete shop. Please try again.");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || "Failed to delete shop. Please try again.");
    },
  });
};

export const useToggleShopBlacklistStatus = () => {
  return useMutation<any, Error, IToggleShopBlacklistStatus>({
    mutationFn: toggleShopBlacklistStatus,
  });
};
