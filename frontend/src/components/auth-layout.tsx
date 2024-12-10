import { toast } from "@/hooks/use-toast";
import { useAppSelector } from "@/redux/hook";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export default function Protected({ authentication = true }) {
  const navigate = useNavigate();
  const { authStatus } = useAppSelector((state) => state.userState);

  useEffect(() => {
    if (authStatus !== "pending") {
      const isLogin = authStatus === "authorized" ? true : false;
      if (authentication && isLogin !== authentication) {
        toast({ title: "Login required!", variant: "destructive" });
        navigate("/login");
      } else if (!authentication && isLogin !== authentication) {
        navigate("/");
      }
    }
  }, [authStatus, navigate, authentication]);

  return authStatus === "pending" ? <h1>Loading...</h1> : <Outlet />;
}
