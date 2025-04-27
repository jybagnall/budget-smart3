"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";
import {
  HomeIcon,
  PencilIcon,
  ReceiptRefundIcon,
} from "@heroicons/react/24/outline";

const navLinks = [
  {
    name: "Dashboard",
    href: "/spent",
    icon: <HomeIcon className="h-5 w-5 text-stone-800" />,
  },
  {
    name: "Categories",
    href: "/spent/categories",
    icon: <ReceiptRefundIcon className="h-5 w-5 text-stone-800" />,
  },
  {
    name: "Record Spending",
    href: "/spent/record-spending",
    icon: <PencilIcon className="h-5 w-5 text-stone-800" />,
  },
];

export default function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="border-r border-stone-800">
      <ul className="flex flex-col gap-2 h-full text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-3 px-5 hover:bg-stone-100 transition-colors flex items-center gap-4 font-semibold text-stone-800 ${
                pathname === link.href && "bg-stone-100"
              }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}
