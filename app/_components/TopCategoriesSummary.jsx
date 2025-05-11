import SummaryCard from "@/app/_components/SummaryCard";

export default function TopCategoriesSummary({ topCategories }) {
  const message = topCategories.length < 3 && "*Only partial data shown";

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

      <p className="text-gray-500 text-xs font-semibold mt-2 text-left">
        {message}{" "}
      </p>
    </ul>
  );
}
