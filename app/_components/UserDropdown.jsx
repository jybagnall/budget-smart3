"use client";

import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import SignOutButton from "./SignOutButton";

export default function UserDropdown({ user }) {
  const { name, image } = user;

  return (
    <>
      <Menu as="div" className="relative">
        <MenuButton className="focus:outline-none">
          <Image
            src={image}
            width={32}
            height={32}
            alt="User"
            className="rounded-full"
            referrerPolicy="no-referrer"
          />
        </MenuButton>

        <MenuItems className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-10 outline-none">
          <div className="p-3 text-sm text-gray-700 border-b border-gray-200 flex items-center gap-3">
            <Image
              src={image}
              width={32}
              height={32}
              alt="User"
              className="rounded-full mb-1"
              referrerPolicy="no-referrer"
            />
            <div className="font-semibold text-sm text-gray-600 truncate">
              {name}
            </div>
          </div>

          <div className="p-2 hover:bg-gray-50">
            <div className="flex items-center">
              <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-gray-600" />
              <SignOutButton />
            </div>
          </div>
        </MenuItems>
      </Menu>
    </>
  );
}
