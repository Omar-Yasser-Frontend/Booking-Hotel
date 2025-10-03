import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../../../services/roomsAPI";
import { useSearchParams } from "react-router";

function useRooms() {
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();
  console.log(queryString);

  const query = useQuery({
    queryKey: ["rooms", queryString],
    queryFn: getRooms,
  });

  return query;
}

export { useRooms };
