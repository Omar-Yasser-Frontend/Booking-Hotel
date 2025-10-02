import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { confirmation } from "../../../services/authAPI";

function useVerification() {
  const [searchParams] = useSearchParams();

  const mutation = useQuery({
    queryKey: ["confirmation"],
    queryFn: () =>
      confirmation({
        userId: searchParams.get("userId") as string,
        token: searchParams.get("token") as string,
      }),
    retry: false,
  });

  return mutation;
}

export { useVerification };
