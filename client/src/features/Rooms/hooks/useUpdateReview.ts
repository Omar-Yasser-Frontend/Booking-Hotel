import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReviews } from "../../../services/reviewsAPI";

export function useUpdateReview() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateReviews,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviews-avg"] });
    },
  });

  return mutation;
}
