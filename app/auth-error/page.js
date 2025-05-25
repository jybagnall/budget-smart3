import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
};

export default function AuthError() {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-2 text-5xl font-semibold tracking-tight text-balance text-sky-950 sm:text-7xl">
          Authentication Error
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Something went wrong during login. Please try again.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/login"
            className="rounded-md bg-sky-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}
