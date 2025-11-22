import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import { Search } from "lucide-react";
import Link from "next/link";
import Avatar from "./internal/Avatar";

const Navbar = () => {
  return (
    <nav className="fixed top-6  inset-x-4 h-16 shadow-sm shadow-primary bg-background border max-w-(--breakpoint-xl) mx-auto rounded-full z-20">
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-2 md:gap-6">
          <Link href={"/"} className="font-extrabold text-xl">
            RateMy<span className="text-primary">College</span>.np
          </Link>

          <div className="relative hidden md:block">
            <Search className="h-5 w-5 absolute inset-y-0 my-auto left-2.5" />
            <Input
              className="pl-10 flex-1 bg-muted border-none shadow-none w-[280px] rounded-full"
              placeholder="Search"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href={"/profile"}>
            <Avatar />
          </Link>
          {/* <Link href={"/login"}>
            <Button
              variant="outline"
              className="hidden sm:inline-flex rounded-full cursor-pointer"
            >
              Sign In
            </Button>
          </Link>
          <Link href={"/signup"}>
            {" "}
            <Button className="rounded-full cursor-pointer">Get Started</Button>
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
