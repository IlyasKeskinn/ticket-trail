import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "../ui/separator";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { CiMenuBurger } from "react-icons/ci";

import Link from "next/link";

import NavItems from "./NavItems";

const MobileNavigation = () => {
  return (
    <nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <CiMenuBurger />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SignedIn>
            <UserButton />
            <Separator />
            <NavItems />
          </SignedIn>
          <SignedOut>
            <Link href={"/sign-in"}>
              <Button
                style={{ width: "100%", marginTop: "25px" }}
                className="bg-rose-500 hover:bg-rose-400 transition-color duration-300 active:bg-rose-600 px-6 py-5 text-base"
              >
                Log in
              </Button>
            </Link>
          </SignedOut>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNavigation;
