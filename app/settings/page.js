import { cookies } from "next/headers";
import SettingPanel from "@/app/_components/SettingsPanel";

export const metadata = {
  title: "Settings",
};

export default async function Page() {
  const cookieStore = await cookies();
  const dateId = cookieStore.get("dateId")?.value;

  return <SettingPanel dateId={dateId} />;
}
