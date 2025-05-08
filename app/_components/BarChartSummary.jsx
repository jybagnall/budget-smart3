import SummaryCard from "./SummaryCard";
import { formatMoney } from "@/app/_services/utils";

export default function BarChartSummary({ result }) {
  return (
    <ul role="list" className="mt-5 grid grid-rows-3 gap-5">
      {result.map((entry) => (
        <SummaryCard
          key={entry.date.month}
          bgColor="bg-emerald-500"
          head={entry.date.month}
          body={`$ ${formatMoney(entry.spending ?? 0)} of ${formatMoney(
            entry.budget
          )} used`}
          status={entry.status}
        />
      ))}
    </ul>
  );
}

// [
//   {
//     date: { month: "March", year: 2024 },
//     spending: 1200,
//     budget: 1500,
//     status: 300
//   },
//   ...
// ]
