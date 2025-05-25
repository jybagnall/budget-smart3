"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import UserDropdown from "./UserDropdown";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import SignOutButton from "./SignOutButton";

const navItems = [
  { name: "Overview", href: "/spent" },
  { name: "Monthly Categories", href: "/spent/categories" },
  { name: "Add Expenses", href: "/spent/record-spending" },
  { name: "History", href: "/history" },
  { name: "Settings", href: "/settings" },
];

export default function SidebarNavLgScreen({ session }) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col border-r bg-white px-6">
      <div className="flex h-16 items-center justify-center border-b">
        <Logo />
      </div>

      <nav className="flex flex-1 flex-col overflow-y-auto py-6">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`block rounded-md px-4 py-2 text-md font-medium ${
                  pathname === item.href
                    ? "bg-gray-100 text-emerald-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto border-t pt-4 pl-2">
          {session?.user ? (
            <div className="p-2 hover:bg-gray-50 flex items-center gap-1">
              <Image
                src={session.user.image}
                width={32}
                height={32}
                alt="User"
                className="rounded-full mb-1"
                referrerPolicy="no-referrer"
              />

              <SignOutButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-x-3 text-md font-medium text-gray-600 hover:text-emerald-600"
            >
              <UserCircleIcon className="h-6 w-6" />
              Login
            </Link>
          )}
        </div>
      </nav>
    </aside>
  );
}
