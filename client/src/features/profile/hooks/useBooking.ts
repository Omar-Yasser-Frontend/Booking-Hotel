import { useQuery } from "@tanstack/react-query";
import { getReservations } from "../../../services/reservationAPI";

export function useBooking() {
  const query = useQuery({
    queryKey: ["booking"],
    queryFn: getReservations,
  });

  return query;
}
