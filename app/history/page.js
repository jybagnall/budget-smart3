import SpendingOverviewChart from "@/app/_components/budget/SpendingOverviewChart";
import SpendingOverviewSummary from "@/app/_components/budget/SpendingOverviewSummary";
import TopCategoriesChart from "@/app/_components/budget/TopCategoriesChart";
import TopCategoriesSummary from "@/app/_components/budget/TopCategoriesSummary";
import {
  getLastThreeMonthsSummary,
  getTopSpendingCategoriesByMonth,
} from "@/app/_services/budget.data-service";

export const metadata = {
  title: "History",
};

export default async function Page() {
  const summaryResult = await getLastThreeMonthsSummary();
  const topCategories = await getTopSpendingCategoriesByMonth();

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="w-full">
          <SpendingOverviewChart result={summaryResult} />
        </div>
        <div className="w-full">
          <SpendingOverviewSummary result={summaryResult} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="w-full">
          <TopCategoriesChart topCategories={topCategories} />
        </div>
        <div className="w-full">
          <TopCategoriesSummary topCategories={topCategories} />
        </div>
      </div>
    </div>
  );
}
