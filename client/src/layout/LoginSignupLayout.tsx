import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginBtn from "../features/auth/components/GoogleLoginBtn";
import { Link, Outlet } from "react-router";

function LoginSignupLayout() {
  return (
    <>
      <Outlet />

      <div className="mt-6 flex items-center gap-3">
        <div className="h-[1px] w-full bg-slate-200" />
        <span className="text-xs text-slate-500">or</span>
        <div className="h-[1px] w-full bg-slate-200" />
      </div>

      <div className="mt-2 text-center">
        <Link
          to="/forgot-password"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <div className="mt-4">
          <GoogleLoginBtn />
        </div>
      </GoogleOAuthProvider>
    </>
  );
}

export default LoginSignupLayout;
