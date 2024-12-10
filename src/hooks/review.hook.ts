/* eslint-disable @typescript-eslint/no-explicit-any */
import { createReview, getAllReviews } from "@/services/ReviewService";
import { ICreateReview, IQueryParam } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getAllReviewsQuery = (params?: IQueryParam[]) => ({
  queryKey: ["REVIEWS", params],
  queryFn: async () => await getAllReviews(params),
});

export const useGetAllReviews = (params?: IQueryParam[]) => {
  return useQuery({
    ...getAllReviewsQuery(params),
  });
};

export const useCreateReview = () => {
  return useMutation<any, Error, ICreateReview>({
    mutationFn: createReview,
  });
};
