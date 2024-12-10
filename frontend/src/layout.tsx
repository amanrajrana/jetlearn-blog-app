import Footer from "./components/footer";
import { Outlet } from "react-router";
import Header from "./components/header";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { getCurrentUser } from "./redux/features/user/services";
import { Toaster } from "@ui/toaster";
import { getCookie } from "./utils/cookie";

export default function Layout() {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.userState.authStatus);
  useEffect(() => {
    if (authStatus === "idle") {
      if (getCookie("token")) dispatch(getCurrentUser());
    }
  }, [dispatch, authStatus]);

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
