import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "../services/reviewsAPI";

export function useDeleteComment() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteReview,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviews-avg"] });
    },
  });

  return mutation;
}
