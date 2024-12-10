import { toast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/redux/features/user/services";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getCookie } from "@/utils/cookie";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export default function Protected({ authentication = true }) {
  const navigate = useNavigate();
  const { authStatus } = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authStatus === "pending") return;

    if (authStatus === "idle") {
      const token = getCookie("token");
      if (token) dispatch(getCurrentUser());
      else if (authentication) navigate("/login");
      return;
    }

    const isLogin = authStatus === "authorized" ? true : false;
    if (authentication && isLogin !== authentication) {
      toast({ title: "Login required!", variant: "destructive" });
      navigate("/login");
    } else if (!authentication && isLogin !== authentication) {
      navigate("/");
    }
  }, [authStatus, navigate, authentication, dispatch]);

  return authStatus === "pending" ? <h1>Loading...</h1> : <Outlet />;
}
