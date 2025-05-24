import MonthSelectAfterLogin from "@/app/_components/app_setting/MonthSelectAfterLogin";
import { getAvailableMonths } from "@/app/_services/date.data-service";

export default async function Page() {
  const { dates } = await getAvailableMonths();

  return (
    <div>
      <MonthSelectAfterLogin dates={dates} />
    </div>
  );
}
