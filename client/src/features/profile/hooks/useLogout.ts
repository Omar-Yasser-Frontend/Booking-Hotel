import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../../services/authAPI";

export function useLogout() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: logout,
    onSettled: () => queryClient.invalidateQueries(),
  });

  return mutation;
}
