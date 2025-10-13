import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "../../../services/userAPI";

export function useUpdateMe() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateMe,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["me"] }),
  });

  return mutation;
}
