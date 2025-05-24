import SummaryCard from "@/app/_components/budget/SummaryCard";
import { formatMoney } from "@/app/_services/utils";

export default function SpendingOverviewSummary({ result }) {
  let message = "";

  if (result.length === 0) {
    message = "*Not available yet";
  } else if (result.length < 3) {
    message = "*Only partial data shown";
  }

  return (
    <ul role="list" className="mt-12 grid grid-rows-3 gap-5">
      {result.map((entry) => (
        <SummaryCard
          key={entry.date.month}
          bgColor="bg-emerald-500"
          head={entry.date.month}
          body={`$ ${formatMoney(
            entry.actual_spending ?? 0
          )} of $ ${formatMoney(entry.budget)} used`}
          status={entry.status}
        />
      ))}

      <p className="text-gray-400 text-sm font-semibold mt-2 text-left">
        {message}{" "}
      </p>
    </ul>
  );
}
