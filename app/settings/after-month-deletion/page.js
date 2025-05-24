import { redirect } from "next/navigation";
import { getAvailableMonths } from "@/app/_services/date.data-service";
import MonthPanelSingle from "@/app/_components/budget/MonthPanelSingle";
import MonthPanelMultiple from "@/app/_components/budget/MonthPanelMultiple";

export default async function Page() {
  const { status, date, dates } = await getAvailableMonths();

  if (status === "empty") {
    redirect("/set-budget");
  }

  if (status === "single") {
    return <MonthPanelSingle date={date} />;
  }

  if (status === "multiple") {
    return <MonthPanelMultiple dates={dates} />;
  }

  return (
    <div className="text-center text-gray-500 mt-12">
      Unexpected error: could not determine budget status.
    </div>
  );
}
