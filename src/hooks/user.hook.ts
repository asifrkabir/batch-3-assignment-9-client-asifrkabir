/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteUser, getAllUsers } from "@/services/UserService";
import { IQueryParam } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getAllUsersQuery = (params?: IQueryParam[]) => ({
  queryKey: ["USERS"],
  queryFn: async () => await getAllUsers(params),
});

export const useGetAllUsers = (params?: IQueryParam[]) => {
  return useQuery({
    ...getAllUsersQuery(params),
  });
};

export const useDeleteUser = () => {
  return useMutation<any, Error, string>({
    mutationFn: deleteUser,
  });
};
