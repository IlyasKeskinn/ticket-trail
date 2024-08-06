import React from "react";
import NavItems from "./NavItems";
import Image from "next/image";
import Link from "next/link";
import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import MobileNavigation from "./MobileNavigation";

const Header = () => {
  return (
    <header className="border-b-2 border-slate-50 shadow-sm">
      <div className=" wrapper flex justify-between items-center ">
        <div id="logo" className="cursor-pointer">
          <Link href={"/"}>
            <Image src="/logo.png" alt={"logo"} width={200} height={100} />
          </Link>
        </div>

        <nav className="md:flex hidden justify-between items-center gap-5">
          <SignedIn>
            <NavItems />
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link href={"/sign-in"}>
              <Button
                style={{ width: "100px" }}
                className="bg-rose-500 hover:bg-rose-400 transition-color duration-300 active:bg-rose-600 px-6 py-5 text-base"
              >
                Log in
              </Button>
            </Link>
          </SignedOut>
        </nav>
        <div className="md:hidden flex justify-between items-center gap-5">
          <UserButton />
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
