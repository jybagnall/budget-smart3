import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { auth } from "@/app/_services/auth";
import UserDropdown from "./UserDropdown";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/history"
            className="text-gray-600 hover:text-emerald-600 transition-colors font-semibold"
          >
            History
          </Link>
        </li>
        <li>
          <Link
            href="/spent"
            className="text-gray-600 hover:text-emerald-600 transition-colors font-semibold"
          >
            Budgets
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            className="text-gray-600 hover:text-emerald-600 transition-colors font-semibold"
          >
            Settings
          </Link>
        </li>
        <li>
          {session?.user ? (
            <UserDropdown user={session.user} />
          ) : (
            <Link href="/login" className="transition-colors font-semibold">
              <UserCircleIcon className="h-6 w-6 text-gray-600 hover:text-emerald-600" />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
