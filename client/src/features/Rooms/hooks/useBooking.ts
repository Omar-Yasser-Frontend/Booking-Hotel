import { useMutation } from "@tanstack/react-query";
import { createReservation } from "../../../services/reservationAPI";

export function useBooking() {
  const mutation = useMutation({
    mutationFn: createReservation,
  });

  return mutation;
}
