import { Suspense } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import PageLayout from "./layout/PageLayout";
import MainLoading from "./components/MainLoading";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AuthLayout from "./layout/AuthLayout";
import LoginSignupLayout from "./layout/LoginSignupLayout";
import Signup from "./pages/Signup";
import AccountVerification from "./pages/AccountVerification";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Rooms from "./pages/Rooms";
import RoomDetails from "./pages/RoomDetails";
import ProfileLayout from "./layout/ProfileLayout";
import ProfileInfo from "./pages/ProfileInfo";
import ProfileChangePassword from "./pages/ProfileChangePassword";
import ProtectedRoutes from "./components/ProtectedRoutes";
import BookingHistory from "./pages/BookingHistory";
import Activities from "./pages/Activities";
import Checkout from "./pages/Checkout";
import Wishlists from "./pages/Wishlists";
import Disclamer from "./components/Disclamer";

function Router() {
  const location = useLocation();
  return (
    <Suspense key={location.key} fallback={<MainLoading />}>
      <Routes>
        <Route element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<Disclamer />} />
          <Route path="/contact" element={<Disclamer />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:roomId" element={<RoomDetails />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlists" element={<Wishlists />} />
            <Route element={<ProfileLayout />}>
              <Route
                index
                element={<Navigate replace to={"/profile/info"} />}
              />
              <Route path="/profile/info" element={<ProfileInfo />} />
              <Route
                path="/profile/change-password"
                element={<ProfileChangePassword />}
              />
              <Route path="/profile/history" element={<BookingHistory />} />
              <Route path="/profile/activities" element={<Activities />} />
            </Route>
          </Route>
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
