import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../../services/authAPI";

function useForogotPassword() {
  const mutation = useMutation({
    mutationFn: forgotPassword,
  });

  return mutation;
}

export { useForogotPassword };
