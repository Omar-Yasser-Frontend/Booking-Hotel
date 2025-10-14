import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { UserContext } from "../context/UserProvider";
import useMe from "../hooks/useMe";
import MainLoading from "./MainLoading";

function ProtectedRoutes() {
  const navigate = useNavigate();
  const { data, isPending, isError } = useMe();

  useEffect(() => {
    if (!isPending && (isError || !data)) navigate("/login");
  }, [data, isError, isPending, navigate]);

  if (isPending) return <MainLoading />;

  if (data)
    return (
      <UserContext.Provider value={data.user}>
        <Outlet />
      </UserContext.Provider>
    );

  return null;
}

export default ProtectedRoutes;
