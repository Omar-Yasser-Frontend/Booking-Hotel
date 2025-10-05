import { useQuery } from "@tanstack/react-query";
import useRoom from "./useRoom";
import { getReviews } from "../../../services/reviewsAPI";

function useRoomReviews() {
  const { data } = useRoom();

  const query = useQuery({
    queryKey: ["reviews", data?.room?._id],

    queryFn: getReviews,
  });

  return query;
}

export default useRoomReviews;
