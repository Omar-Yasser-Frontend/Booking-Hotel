import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div className="flex min-h-[calc(100vh-84px)] items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4 py-10">
      <div className="w-full max-w-md border border-slate-200 bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-semibold tracking-tight text-slate-800">
          Welcome back
        </h2>

        <Outlet />

        <div className="mt-6 text-center text-sm text-slate-500">
          By continuing you agree to our
          <span className="px-1 font-medium text-slate-700">Terms</span>
          and
          <span className="px-1 font-medium text-slate-700">
            Privacy Policy
          </span>
          .
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
