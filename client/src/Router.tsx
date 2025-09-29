import { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router";
import HomePage from "./pages/HomePage";
import PageLayout from "./layout/PageLayout";
import MainLoading from "./components/MainLoading";

function Router() {
  const location = useLocation();
  return (
    <Suspense key={location.key} fallback={<MainLoading />}>
      <Routes>
        <Route element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="test" element={<p>test-page</p>} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default Router;
