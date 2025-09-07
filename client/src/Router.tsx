import { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router";
import HomePage from "./pages/HomePage";

function Router() {
  const location = useLocation();
  return (
    <Suspense key={location.pathname} fallback={<p>LOADING...</p>}>
      <Routes>
        <Route index element={<HomePage />} />
      </Routes>
    </Suspense>
  );
}

export default Router;
