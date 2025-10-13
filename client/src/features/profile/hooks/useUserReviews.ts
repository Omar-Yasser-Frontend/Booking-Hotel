import { useInfiniteQuery } from "@tanstack/react-query";
import useMe from "../../../hooks/useMe";
import { getMyReviews } from "../../../services/reviewsAPI";

export function useUserReviews() {
  const { data } = useMe();
  const queries = useInfiniteQuery({
    queryKey: ["my-reviews"],
    queryFn: ({ pageParam }) => getMyReviews(pageParam),
    initialPageParam: 1,
    enabled: !!data,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  return queries;
}
