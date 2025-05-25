"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";

import {
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import UserDropdown from "./UserDropdown";
import Image from "next/image";

export default function NavigationCollapse({ session, userHasNoData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const spentLinks = [
    { name: "Overview", href: "/spent" },
    { name: "Monthly Categories", href: "/spent/categories" },
    { name: "Add Expenses", href: "/spent/record-spending" },
  ];

  return (
    <nav className="z-10 text-xl w-full">
      <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-10 px-4 sm:px-6 md:flex-row">
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
            aria-label="Toggle Budget Menu"
          >
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6 text-gray-700" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        <div className="mt-2 lg:mt-0">
          {session?.user ? (
            <UserDropdown user={session.user} />
          ) : (
            <Link href="/login" className="transition-colors font-semibold">
              <UserCircleIcon className="h-6 w-6 text-gray-600 hover:text-emerald-600" />
            </Link>
          )}
        </div>
      </div>

      {menuOpen && !userHasNoData && (
        <Dialog
          open={menuOpen}
          onClose={setMenuOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop className="fixed inset-0 bg-gray-900/80 transition-opacity" />

          <div className="fixed inset-0 flex">
            <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 bg-white px-6 pb-4 pt-5 shadow-lg overflow-y-auto">
              <TransitionChild>
                <div className="absolute top-0 right-0 pt-5 pr-5">
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-600"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>

              <div className="flex grow flex-col gap-y-5">
                <div className="flex items-center h-10">
                  <Image
                    src="/budget_logo.png"
                    height="60"
                    width="60"
                    alt="logo"
                  />
                  <span className="text-xl font-semibold text-green-700 whitespace-nowrap">
                    Budget Smart
                  </span>
                </div>

                <nav className="flex-1">
                  <ul role="list" className="space-y-1">
                    {!userHasNoData &&
                      spentLinks.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className={`group flex gap-x-3 rounded-md p-2 text-md font-semibold ${
                              pathname === link.href
                                ? "bg-gray-100 text-emerald-600"
                                : "text-gray-700 hover:bg-gray-100 hover:text-emerald-600"
                            }`}
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}

                    <li>
                      <Link
                        href="/history"
                        onClick={() => setMenuOpen(false)}
                        className="group flex gap-x-3 rounded-md p-2 text-md font-semibold text-gray-700 hover:bg-gray-100 hover:text-emerald-600"
                      >
                        History
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/settings"
                        onClick={() => setMenuOpen(false)}
                        className="group flex gap-x-3 rounded-md p-2 text-md font-semibold text-gray-700 hover:bg-gray-100 hover:text-emerald-600"
                      >
                        Settings
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </nav>
  );
}
