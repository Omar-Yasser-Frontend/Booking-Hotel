import { useInfiniteQuery } from "@tanstack/react-query";
import { getReviews } from "../../../services/reviewsAPI";
import { useParams } from "react-router";

function useReview() {
  const { roomId } = useParams();
  const queries = useInfiniteQuery({
    queryKey: ["reviews", roomId],
    queryFn: ({ pageParam }) => getReviews(pageParam, roomId as string),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  return queries;
}

export default useReview;
