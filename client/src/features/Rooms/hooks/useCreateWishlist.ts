import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWishlist } from "../../../services/wishlistsAPI";

export function useCreateWishlist() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createWishlist,

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["my-wishlist"] });
    },
  });

  return mutation;
}
