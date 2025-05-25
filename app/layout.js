import { Manrope } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "@/app/_styles/globals.css";
import Header from "./_components/app_setting/Header";
import SidebarNavLgScreen from "./_components/app_setting/SidebarNavLgScreen";
import { Providers } from "@/app/_components/app_setting/Providers";
import { auth } from "@/app/_services/auth";

const manropeSans = Manrope({
  display: "swap",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | Budget Smart",
    default: "Budget Smart",
  },
  description: "Take Control of Your Finances",
  keywords: ["budget", "finance", "tracker", "expenses"],
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${manropeSans.className} antialiased font-sans min-h-screen flex flex-col`}
      >
        <Header />
        <SidebarNavLgScreen session={session} />

        <div className="flex-1 lg:pl-64 lg:pt-6">
          <main className="py-6 px-4 sm:px-6 lg:px-8">
            <Providers>
              {children}
              <Toaster position="top-center" reverseOrder={false} />
            </Providers>
          </main>
        </div>
      </body>
    </html>
  );
}
