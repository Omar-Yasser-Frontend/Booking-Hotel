import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useGoogle } from "../hooks/useGoogle";

export default function GoogleLoginBtn() {
  const { mutate: googleAuth } = useGoogle();

  const success = async (authResult: { code: string }) =>
    googleAuth(authResult.code);

  const fail = async () => toast.error("Failed to login using google");

  const googleLogin = useGoogleLogin({
    onSuccess: success,
    onError: fail,
    flow: "auth-code",
  });

  return (
    <button
      className="border-base mx-auto flex w-full max-w-xl cursor-pointer items-center justify-center gap-3 rounded-lg border-1 py-3 text-black duration-400 hover:bg-gray-100"
      onClick={googleLogin}
    >
      <span className="text-lg">Sign in with Google</span>{" "}
      <FcGoogle size={26} />
    </button>
  );
}
