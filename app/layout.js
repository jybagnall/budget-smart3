import { Manrope } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "@/app/_styles/globals.css";
import Header from "./_components/Header";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${manropeSans.className} antialiased font-sans min-h-screen bg-stone-50 flex flex-col`}
      >
        <Header />

        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            {children}
            <Toaster position="top-center" reverseOrder={false} />
          </main>
        </div>
      </body>
    </html>
  );
}
