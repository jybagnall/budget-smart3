import SideNavigation from "@/app/_components/app_setting/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-[14rem_1fr] h-full gap-6">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
}
