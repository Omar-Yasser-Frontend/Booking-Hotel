import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";

function PageLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default PageLayout;
