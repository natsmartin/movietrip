"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

export const links = [
  { name: "Home", href: "/" },
  { name: "Popular", href: "/popular" },
  { name: "Top Rated", href: "/top_rated" },
  { name: "Upcoming", href: "/upcoming" },
];

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <div
      className="flex justify-center items-center flex-wrap my-2 *:w-[100px]
       md:flex-row *:md:w-[150px] *:md:p-4 *:text-center *:font-bold
       *:p-3 *:m-[1px] *:text-white *:rounded-lg"
    >
      {links.map((link) => (
        <Link
          title={link.name}
          className={clsx(`md:text-base text-xs bg-gray-800 hover:bg-gray-600`, {
           "bg-gray-600 focus:bg-gray-600": pathname === link.href,
          })}
          key={link.name}
          href={link.href}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
