import SummaryCard from "@/app/_components/SummaryCard";
import { formatMoney } from "@/app/_services/utils";

export default function SpendingOverviewSummary({ result }) {
  const message = result.length < 3 && "*Only partial data shown";

  return (
    <ul role="list" className="mt-12 grid grid-rows-3 gap-5">
      {result.map((entry) => (
        <SummaryCard
          key={entry.date.month}
          bgColor="bg-emerald-500"
          head={entry.date.month}
          body={`$ ${formatMoney(entry.actual_spending ?? 0)} of ${formatMoney(
            entry.budget
          )} used`}
          status={entry.status}
        />
      ))}

      <p className="text-gray-500 text-xs font-semibold mt-2 text-left">
        {message}{" "}
      </p>
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
