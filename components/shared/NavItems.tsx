"use client";
import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const pathName = usePathname();

  return (
    <ul className="md:flex md:justify-between flex-row justify-between items-center md:gap-5 gap-96">
      {headerLinks.map((headerLink) => {
        const isActive: boolean = pathName === headerLink.route;
        return (
          <li
            key={headerLink.route}
            className={`text-slate-500 text-lg hover:text-slate-600 cursor-pointer transition-colors md:my-0 my-5 ${
              isActive ? "text-slate-800" : ""
            }`}
          >
            <Link href={headerLink.route}> {headerLink.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
