import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePassword } from "../../../services/authAPI";

export function useChangePassword() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: changePassword,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["me"] }),
  });

  return mutation;
}
