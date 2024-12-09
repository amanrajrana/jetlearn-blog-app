import { Button } from "@ui/button";
import { BotMessageSquare, LogIn } from "lucide-react";

export default function Header() {
  return (
    <header className="from-background/10 via-background/50 to-background/80 fixed top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b px-4 backdrop-blur-xl">
      <div className="flex items-center">
        <a href={"/"}>
          <BotMessageSquare />
        </a>
        <div className="flex items-center ">
          <span className="ml-2 text-sm font-medium hover:underline dark:text-zinc-200">
            Riddler
          </span>
        </div>
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
