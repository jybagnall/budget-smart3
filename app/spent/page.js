import { cookies } from "next/headers";
import {
  getCategories,
  getTotalSpending,
  getThisMonthBudget,
} from "../_services/data-service";
import OverviewHeader from "../_components/OverviewHeader";
import OverviewStatList from "../_components/OverviewStatList";

export default async function Page() {
  const cookieStore = await cookies();
  const dateId = cookieStore.get("dateId")?.value;

  return (
    <main>
      <div className="relative isolate overflow-hidden pt-16">
        <OverviewHeader dateId={dateId} />
        <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
          <OverviewStatList dateId={dateId} />
        </div>

        <div className="space-y-16 py-16 xl:space-y-20">
          <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2>Expenditure Per Category</h2>
            </div>
          </div>
        </div>

        <div className="space-y-16 py-16 xl:space-y-20">
          <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2>Biggest Purchase</h2>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
// <div></div>
//Total Expenditure to Date, Remaining Budget, Top 3 Categories

//📅 Current month + buttons to change month
//💰 Total spent vs. budget (progress bar)
//🧾 Top 5 spending categories
//📈 Simple chart (e.g., pie or bar) of spending by category
