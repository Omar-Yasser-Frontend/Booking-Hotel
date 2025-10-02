import { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router";
import HomePage from "./pages/HomePage";
import PageLayout from "./layout/PageLayout";
import MainLoading from "./components/MainLoading";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AuthLayout from "./features/auth/layouts/AuthLayout";
import LoginSignupLayout from "./features/auth/layouts/LoginSignupLayout";
import Signup from "./pages/Signup";
import AccountVerification from "./pages/AccountVerification";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Rooms from "./pages/Rooms";

function Router() {
  const location = useLocation();
  return (
    <Suspense key={location.key} fallback={<MainLoading />}>
      <Routes>
        <Route element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route element={<AuthLayout />}>
            <Route element={<LoginSignupLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
          <Route path="/confirm" element={<AccountVerification />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default Router;
