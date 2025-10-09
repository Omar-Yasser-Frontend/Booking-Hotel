import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getReservedDates } from "../../../services/reservationAPI";

export function useReserved() {
  const { roomId } = useParams();
  const query = useQuery({
    queryKey: ["reserved-date", roomId],
    queryFn: getReservedDates,
  });

  return query;
}
