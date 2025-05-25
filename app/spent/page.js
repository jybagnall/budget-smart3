import { cookies } from "next/headers";
import { Suspense } from "react";
import SpinnerMini from "../_components/shared/SpinnerMini";
import OverviewHeader from "@/app/_components/budget/OverviewHeader";
import OverviewStatList from "@/app/_components/budget/OverviewStatList";
import ChartContainer from "@/app/_components/budget/ChartContainer";
import {
  getAllMonthAndYearInfo,
  getMonthAndYear,
} from "@/app/_services/date.data-service";
import { getTotalSumPerCategory } from "@/app/_services/budget.data-service";
import ChartExplanation from "@/app/_components/budget/ChartExplanation";
import BiggestPurchase from "@/app/_components/budget/BiggestPurchase";

export const metadata = {
  title: "Budgets",
};

export default async function Page() {
  const cookieStore = await cookies();
  const dateId = cookieStore.get("dateId")?.value;

  const { month: currentMonth, year: currentYear } = await getMonthAndYear(
    dateId
  );
  const allMonthsAndYears = await getAllMonthAndYearInfo();
  const totalSumPerCategory = await getTotalSumPerCategory(dateId);

  return (
    <main>
      <div className="relative isolate overflow-hidden -mt-4">
        <OverviewHeader
          currentMonth={currentMonth}
          currentYear={currentYear}
          allMonthsAndYears={allMonthsAndYears}
          dateId={dateId}
        />

        <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
          <Suspense fallback={<SpinnerMini />}>
            <OverviewStatList
              dateId={dateId}
              totalSumPerCategory={totalSumPerCategory}
            />
          </Suspense>
        </div>

        <div className="space-y-6 pb-4 xl:space-y-10 mt-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-semibold text-blue-600 mb-3">
              Biggest Purchases
            </h2>
            <Suspense fallback={<SpinnerMini />}>
              <BiggestPurchase dateId={dateId} />
            </Suspense>
          </div>
        </div>

        <div className="space-y-8 py-8 xl:space-y-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-semibold text-blue-600">
              Expenditure Per Category
            </h2>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 mt-6 items-start">
              <div className="flex-shrink-0 w-60 h-60 sm:w-72 sm:h-72">
                <ChartContainer totalSumPerCategory={totalSumPerCategory} />
              </div>
              <div className="flex-1">
                <ChartExplanation totalSumPerCategory={totalSumPerCategory} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
