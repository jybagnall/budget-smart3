import { cookies } from "next/headers";

import OverviewHeader from "@/app/_components/OverviewHeader";
import OverviewStatList from "@/app/_components/OverviewStatList";
import ChartContainer from "@/app/_components/ChartContainer";
import { getTotalSumPerCategory } from "@/app/_services/data-service";
import ChartExplanation from "@/app/_components/ChartExplanation";
import BiggestPurchase from "@/app/_components/BiggestPurchase";

export default async function Page() {
  const cookieStore = await cookies();
  const dateId = cookieStore.get("dateId")?.value;
  const totalSumPerCategory = await getTotalSumPerCategory(dateId);

  return (
    <main>
      <div className="relative isolate overflow-hidden -mt-4">
        <OverviewHeader dateId={dateId} />
        <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
          <OverviewStatList
            dateId={dateId}
            totalSumPerCategory={totalSumPerCategory}
          />
        </div>

        <div className="space-y-8 py-8 xl:space-y-14">
          <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-lg font-semibold">
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

        <div className="space-y-6 pb-4 xl:space-y-10">
          <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-lg font-semibold mb-3">Biggest Purchases</h2>
              <BiggestPurchase dateId={dateId} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
// <div></div>

//📅 Current month + buttons to change month
//💰 Total spent vs. budget (progress bar)
