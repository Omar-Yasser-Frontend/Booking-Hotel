import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadMeImage } from "../../../services/userAPI";

export function useUploadAvatar() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: uploadMeImage,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["me"] }),
  });

  return mutation;
}
