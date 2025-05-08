import BarChartPanel from "@/app/_components/BarChartPanel";
import BarChartSummary from "@/app/_components/BarChartSummary";

import { getLastThreeMonthsSummary } from "@/app/_services/data-service";

export default async function Page() {
  const result = await getLastThreeMonthsSummary();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <div className="w-full">
        <BarChartPanel result={result} />
      </div>
      <div className="w-full">
        <BarChartSummary result={result} />
      </div>
    </div>
  );
}

// Monthly Spending Summary (bar graph, last 3 months)
// Top Spending Categories (scatter chart)

// If data.length === 0: show "No data available"

// If data.length < 3: maybe indicate "Only partial data shown"

// [
//   {
//     date: { month: "March", year: 2024 },
//     spending: 1200,
//     budget: 1500
//   },
//   ...
// ]
