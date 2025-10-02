import { useEffect } from "react";
import { useVerification } from "../hooks/useVerification";
import PrimaryBtn from "../../../components/PrimaryBtn";
import { useNavigate } from "react-router";
import MainLoading from "../../../components/MainLoading";

function AccountVerificationBody() {
  const navigate = useNavigate();
  const { isPending, error, isError } = useVerification();

  useEffect(() => {
    if (!isPending && !isError) {
      navigate("/");
    }
  }, [isPending, isError, navigate]);

  if (isPending || !isError) return <MainLoading />;

  return (
    <div className="container mx-auto py-20 text-center">
      <h2 className="mb-10 text-3xl text-red-500">
        {error as unknown as string}
      </h2>
      <PrimaryBtn to="/">Go Home</PrimaryBtn>
    </div>
  );
}

export default AccountVerificationBody;
