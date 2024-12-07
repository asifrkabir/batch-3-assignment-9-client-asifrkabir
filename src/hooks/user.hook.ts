/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllUsers } from "@/services/UserService";
import { IQueryParam } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const getAllUsersQuery = (params?: IQueryParam[]) => ({
  queryKey: ["USERS"],
  queryFn: async () => await getAllUsers(params),
});

export const useGetAllUsers = (params?: IQueryParam[]) => {
  return useQuery({
    ...getAllUsersQuery(params),
  });
};
