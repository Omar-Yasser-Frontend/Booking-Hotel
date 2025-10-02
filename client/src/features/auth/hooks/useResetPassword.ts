import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";
import { resetPassword } from "../../../services/authAPI";

function useResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (password: string) =>
      resetPassword({
        password,
        userId: searchParams.get("userId") as string,
        token: searchParams.get("token") as string,
      }),
    onSuccess: () => navigate("/signup"),
  });

  return mutation;
}

export { useResetPassword };
