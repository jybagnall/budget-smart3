"use client";
import { useRouter } from "next/navigation";
import { getMonthName } from "@/app/_services/utils";

export default function OverviewHeaderMonthSelector({
  allMonthsAndYears,
  handleShowSelection,
  dateId,
}) {
  const router = useRouter();

  if (allMonthsAndYears.length <= 1) return null;

  const handleSelectedId = (newId) => {
    if (dateId === newId) return;

    document.cookie = `dateId=${newId}; path=/; max-age=${60 * 60 * 24 * 7}`;
    router.refresh();
    handleShowSelection();
  };

  return (
    <ul className="mt-2 w-fit rounded-md border border-gray-300 bg-white shadow-md">
      {allMonthsAndYears.map((entry) => (
        <li
          key={entry.id}
          onClick={() => handleSelectedId(entry.id)}
          className="cursor-pointer px-7 py-2 text-sm text-gray-700 hover:bg-blue-100"
        >
          {getMonthName(entry.month - 1)}, {entry.year}
        </li>
      ))}
    </ul>
  );
}
