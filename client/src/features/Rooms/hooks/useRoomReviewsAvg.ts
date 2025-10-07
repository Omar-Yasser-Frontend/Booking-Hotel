import { useQuery } from "@tanstack/react-query";
import { getReviewsAvg } from "../../../services/reviewsAPI";
import useRoom from "./useRoom";

function useRoomReviewsAvg() {
  const { data } = useRoom();

  const query = useQuery({
    queryKey: ["reviews-avg", data?.room?._id],

    queryFn: getReviewsAvg,
  });

  return query;
}

export default useRoomReviewsAvg;
