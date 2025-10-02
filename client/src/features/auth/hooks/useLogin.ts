import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../../services/authAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Login Successfully");
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

export { useLogin };
