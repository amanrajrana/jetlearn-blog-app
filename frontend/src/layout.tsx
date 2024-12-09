import Footer from "./components/footer";
import { Outlet } from "react-router";
import Header from "./components/header";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="bg-muted">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
