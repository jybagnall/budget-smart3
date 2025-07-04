import Link from "next/link";
import Image from "next/image";
import budget_bg from "@/public/budget_bg.JPG";
import { auth } from "@/app/_services/auth";

export default async function Page() {
  const session = await auth();

  return (
    <div className="mt-24 overflow-hidden">
      <Image
        src={budget_bg}
        fill
        quality={80}
        className="object-cover object-top"
        alt="Homepage background"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-5xl text-teal-600 mb-20 tracking-tight font-normal leading-relaxed">
          Track expenses, <br />
          and stay on top of your finances.
        </h1>
        {!session?.user && (
          <Link
            href="/login"
            className="inline-block px-8 py-4 bg-blue-50 text-teal-800 text-lg font-semibold hover:text-teal-600 transition-all rounded-md"
          >
            Get Started
          </Link>
        )}
      </div>
    </div>
  );
}
