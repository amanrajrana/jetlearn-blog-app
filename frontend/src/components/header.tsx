import { Button } from "@ui/button";
import { BotMessageSquare, LogIn } from "lucide-react";
import { Link } from "react-router";

export default function Header() {
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
        </nav>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Button asChild>
          <a href={"/login"}>
            <LogIn className="mr-2" size={14} />
            Login
          </a>
        </Button>
      </div>
    </header>
  );
}
