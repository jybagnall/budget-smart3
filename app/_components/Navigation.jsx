import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/history"
            className="hover:text-emerald-600 transition-colors font-semibold"
          >
            History
          </Link>
        </li>
        <li>
          <Link
            href="/spent"
            className="hover:text-emerald-600 transition-colors font-semibold"
          >
            Budgets
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            className="hover:text-emerald-600 transition-colors font-semibold"
          >
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}
