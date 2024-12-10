import Footer from "./components/footer";
import { Outlet } from "react-router";
import Header from "./components/header";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/hook";
import { getCurrentUser } from "./redux/features/user/services";
import { Toaster } from "@ui/toaster";

export default function Layout() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("get current user dispatch run ");
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="bg-muted min-h-svh border-b">
        <Outlet />
      </div>
      <Toaster />
      <Footer />
    </>
  );
}
