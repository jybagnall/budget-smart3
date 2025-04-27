import { PowerIcon } from "@heroicons/react/24/outline";
import { signOutAction } from "../_services/actions";

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        title="Logout"
        className="group flex items-center py-3 px-5 gap-4 transition-all duration-200 ease-in-out"
      >
        <span
          className="w-6 h-6 flex items-center justify-center rounded-full border border-transparent
      text-stone-800 transition-colors duration-200 group-hover:ring-2 group-hover:ring-stone-800"
        >
          <PowerIcon className="w-5 h-5" />
        </span>
        <span className="text-gray-600 transition-colors duration-200 group-hover:text-stone-800">
          Sign out
        </span>
      </button>
    </form>
  );
}
