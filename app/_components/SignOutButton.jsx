"use client";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOutAction } from "../_services/actions";

export default function SignOutButton({ text = "Sign out", style }) {
  return (
    <form action={signOutAction}>
      <button
        title="Logout"
        className="group flex items-center py-3 px-5 gap-4 transition-all duration-200 ease-in-out"
      >
        <span
          className={
            style ? style : "text-sm text-gray-600 hover:text-gray-800"
          }
        >
          {text}
        </span>
      </button>
    </form>
  );
}
