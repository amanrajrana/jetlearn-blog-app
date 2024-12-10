import { Button } from "@ui/button";
import { BotMessageSquare, LogIn } from "lucide-react";
import { Link } from "react-router";
import { LogOutAlert } from "./logout";
import { useAppSelector } from "@/redux/hook";

export default function Header() {
  const isLogin = useAppSelector(
    (state) => state.userState.authStatus === "authorized"
  );

  return (
    <header className="from-background/10 via-background/50 to-background/80 fixed top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b px-4 backdrop-blur-xl">
      <Link to={"/"} className="flex items-center">
        <BotMessageSquare />
        <div className="flex items-center ">
          <span className="ml-2 hidden xs:inline-block text-sm font-medium hover:underline dark:text-zinc-200">
            Riddler
          </span>
        </div>
      </Link>
      <div>
        <nav className="flex items-center space-x-4">
          <Link to={"/"} className="text-sm font-medium hover:underline">
            Home
          </Link>
          <Link to={"/blogs"} className="text-sm font-medium hover:underline">
            Blogs
          </Link>
          {isLogin && (
            <Link
              to={"/blogs/new"}
              className="text-sm font-medium hover:underline"
            >
              create
            </Link>
          )}
        </nav>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Button asChild>
          {isLogin ? (
            <LogOutAlert />
          ) : (
            <Link to={"/login"}>
              <LogIn size={14} />
              Login
            </Link>
          )}
        </Button>
      </div>
    </header>
  );
}
