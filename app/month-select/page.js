import MonthSelectAfterLogin from "@/app/_components/MonthSelectAfterLogin";
import { getTargetMonthAfterLogin } from "@/app/_services/data-service";

export default async function Page() {
  const { dates } = await getTargetMonthAfterLogin();

  return (
    <div>
      <MonthSelectAfterLogin dates={dates} />
    </div>
  );
}
