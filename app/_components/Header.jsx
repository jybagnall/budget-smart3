import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";

export default function Header() {
  return (
    <header className="border-b border-blue-50 px-8 py-5">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}
