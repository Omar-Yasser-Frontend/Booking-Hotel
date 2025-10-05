import { useQuery } from "@tanstack/react-query";
import { getRoomDetails } from "../../../services/roomsAPI";
import { useParams } from "react-router";

function useRoom() {
  const { roomId } = useParams();

  const query = useQuery({
    queryKey: ["room", roomId],
    queryFn: getRoomDetails,
  });

  return query
}

export default useRoom;
