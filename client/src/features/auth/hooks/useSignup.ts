import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../../../services/authAPI";
import { useNavigate } from "react-router";

function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      navigate("/");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  return mutation;
}

export { useSignup };
