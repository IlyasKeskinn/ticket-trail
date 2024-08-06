"use client";
import { headerLinks } from "@/constants";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavItems = () => {
  const pathName = usePathname();

  return (
    <ul className="md:flex md:justify-between flex-row justify-between items-center md:gap-5 gap-96">
      {headerLinks.map((headerLink) => {
        const isActive: boolean = pathName === headerLink.route;
        return (
          <div key={headerLink.route}>
            <li
              className={`text-slate-500 text-lg hover:text-slate-600 cursor-pointer transition-colors md:my-0 my-5 ${
                isActive ? "text-slate-800" : ""
              }`}
            >
              <Link href={headerLink.route}> {headerLink.label}</Link>
            </li>
            <Separator className="md:hidden block" />
          </div>
        );
      })}
    </ul>
  );
};

export default NavItems;
