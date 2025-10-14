import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWishlist } from "../services/wishlistsAPI";

export function useDeleteWishlist() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteWishlist,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["my-wishlist"] });
    },
  });

  return mutation;
}
