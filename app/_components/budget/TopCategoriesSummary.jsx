import SummaryCard from "@/app/_components/budget/SummaryCard";

export default function TopCategoriesSummary({ topCategories }) {
  let message = "";

  if (topCategories.length === 0) {
    message = "*Not available yet";
  } else if (topCategories.length < 3) {
    message = "*Only partial data shown";
  }

  return (
    <ul role="list" className="mt-12 grid grid-rows-3 gap-5">
      {topCategories.map((entry) => (
        <SummaryCard
          key={entry.monthName}
          bgColor="bg-blue-400"
          head={entry.monthName}
          body={entry.category}
        />
      ))}

      <p className="text-gray-400 text-sm font-semibold mt-2 text-left">
        {message}{" "}
      </p>
    </ul>
  );
}
