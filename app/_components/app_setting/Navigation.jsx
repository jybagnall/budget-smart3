import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { auth } from "@/app/_services/auth";
import { getAvailableMonths } from "@/app/_services/date.data-service";
import UserDropdown from "./UserDropdown";

const linkStyle =
  "text-gray-600 hover:text-emerald-600 transition-colors font-semibold";

export default async function Navigation() {
  const session = await auth();
  const { status } = await getAvailableMonths();

  const userHasNoData = status == "empty";

  return (
    <nav className="z-10 text-xl w-full">
      <ul className="flex flex-nowrap items-center justify-center md:justify-end gap-6 sm:gap-10 px-4 sm:px-6 md:flex-row min-w-0">
        {!userHasNoData && (
          <>
            <li>
              <Link href="/history" className={linkStyle}>
                History
              </Link>
            </li>
            <li>
              <Link href="/spent" className={linkStyle}>
                Budgets
              </Link>
            </li>
            <li>
              <Link href="/settings" className={linkStyle}>
                Settings
              </Link>
            </li>
          </>
        )}

        <li className="mt-2 lg:mt-0 lg:ml-6">
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
