import { useQuery } from "@tanstack/react-query";
import { getWishlists } from "../../../services/wishlistsAPI";

export function useWishlist() {
  const query = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlists,
  });

  return query;
}
