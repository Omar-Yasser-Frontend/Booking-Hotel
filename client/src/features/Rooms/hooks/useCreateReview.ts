import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "../../../services/reviewsAPI";
import toast from "react-hot-toast";
import { useParams } from "react-router";

function useCreateReview() {
  const { roomId } = useParams();
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: (data: { rating: number; comment: string }) =>
      createReview({ roomId: roomId as string, ...data }),
    onSuccess: () => toast.success("Comment sent successfully!"),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["reviews"] });
      await queryClient.invalidateQueries({ queryKey: ["reviews-avg"] });
    },
  });

  return mutate;
}

export default useCreateReview;
