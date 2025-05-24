"use client";
import { useRouter } from "next/navigation";
import { getMonthName } from "@/app/_services/utils";

export default function MonthPanelSingle({ date }) {
  const { month, year, id } = date;
  const router = useRouter();

  const handleWorkExistingBudget = () => {
    document.cookie = `dateId=${id}; path=/; max-age=${60 * 60 * 24 * 14}`;
    router.push("/spent/categories");
  };

  const handleSetNewBudget = () => {
    router.push("/set-budget");
  };

  return (
    <div className="max-w-md mx-auto mt-8 space-y-4">
      <div
        onClick={handleWorkExistingBudget}
        className="cursor-pointer rounded-lg border p-6 shadow hover:border-blue-500 hover:bg-blue-50 transition"
      >
        <p className="text-lg font-semibold text-gray-700 mb-2">
          Work with existing budget for{" "}
          <span className="text-blue-600">
            {getMonthName(month - 1)} {year}
          </span>
        </p>
        <p className="text-sm text-gray-500">
          This will restore your last saved budget for this month.
        </p>
      </div>

      <div
        onClick={handleSetNewBudget}
        className="cursor-pointer rounded-lg border p-6 shadow hover:border-violet-500 hover:bg-violet-50 transition"
      >
        <p className="text-lg font-semibold text-gray-700 mb-2">
          Start a new budget
        </p>
        <p className="text-sm text-gray-500">Set a new budget from scratch.</p>
      </div>
    </div>
  );
}
