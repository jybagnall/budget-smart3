import { auth } from "@/app/_services/auth";
import SignInButton from "@/app/_components/app_setting/SignInButton";
import SignOutButton from "@/app/_components/app_setting/SignOutButton";

export const metadata = {
  title: "Login",
};

export default async function Page() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      {session?.user ? (
        <>
          <h2 className="text-3xl font-semibold text-gray-700">
            You are already signed in as{" "}
            <span className="font-medium">{session.user.name}</span>
          </h2>
          <SignOutButton
            text="Sign out to switch account"
            style="bg-stone-100 text-stone-800 px-6 py-4 rounded hover:bg-stone-200 transition"
          />
        </>
      ) : (
        <>
          <h2 className="text-3xl font-semibold">Sign in to proceed</h2>
          <SignInButton />
        </>
      )}
    </div>
  );
}
