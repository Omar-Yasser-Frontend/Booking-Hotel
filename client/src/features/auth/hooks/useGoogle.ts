import { useMutation, useQueryClient } from "@tanstack/react-query";
import { googleAuth } from "../../../services/authAPI";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function useGoogle() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: googleAuth,
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

export { useGoogle };
