import { cookies } from "next/headers";
import SettingPanel from "@/app/_components/app_setting/SettingsPanel";
import { getMonthAndYear } from "@/app/_services/date.data-service";
import { getMonthName } from "@/app/_services/utils";

export const metadata = {
  title: "Settings",
};

export default async function Page() {
  const cookieStore = await cookies();
  const dateId = cookieStore.get("dateId")?.value;

  const { month } = await getMonthAndYear(dateId);
  const monthName = getMonthName(month - 1);

  return <SettingPanel dateId={dateId} monthName={monthName} />;
}
