import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-between shadow-md items-end p-5 bg-slate-100 bg-dotted-spacing-10 bg-dotted-gray-100">
      <div id="logo" className="cursor-pointer">
        <Link href={"/"}>
          <Image src="/logo.png" alt={"logo"} width={200} height={100} />
        </Link>
      </div>

      <div>
        <p className="text-gray-500 text-sm align-text-bottom">
          2024 Ticker Trail. All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
