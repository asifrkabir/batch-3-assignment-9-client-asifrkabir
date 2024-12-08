/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllReviews } from "@/services/ReviewService";
import { IQueryParam } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const getAllReviewsQuery = (params?: IQueryParam[]) => ({
  queryKey: ["REVIEWS", params],
  queryFn: async () => await getAllReviews(params),
});

export const useGetAllReviews = (params?: IQueryParam[]) => {
  return useQuery({
    ...getAllReviewsQuery(params),
  });
};
