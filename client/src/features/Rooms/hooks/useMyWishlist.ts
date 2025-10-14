import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getWishlist } from "../../../services/wishlistsAPI";
import useMe from "../../../hooks/useMe";

export function useMyWishlist() {
  const { roomId } = useParams();
  const { data } = useMe();

  const query = useQuery({
    queryKey: ["my-wishlist", roomId],
    queryFn: getWishlist,
    enabled: !!data,
  });

  return query;
}
