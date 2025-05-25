import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-1 z-10">
      <Image src="/budget_logo.png" height="60" width="60" alt="logo" />
      <span className="text-xl font-semibold text-green-700 whitespace-nowrap">
        Budget Smart
      </span>
    </Link>
  );
}
