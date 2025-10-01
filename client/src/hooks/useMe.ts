import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/userAPI";

function useMe() {
  const user = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });

  return user;
}

export default useMe;
