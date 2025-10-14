import { useMutation } from "@tanstack/react-query";
import { searchRooms } from "../services/roomsAPI";

export function useSearch() {
  const mutation = useMutation({
    mutationFn: searchRooms,
  });

  return mutation;
}
