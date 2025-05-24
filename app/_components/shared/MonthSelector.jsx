"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { getMonthName } from "@/app/_services/utils";

export default function MonthSelector({
  handleMonthChange,
  targetMonth,
  targetYear,
}) {
  return (
    <div className="mt-2 w-full flex items-center justify-center text-gray-900">
      {/* Previous Month Button */}
      <button
        type="button"
        onClick={() => handleMonthChange("prev")}
        className="-m-1.5 flex items-center justify-center p-1.5 text-emerald-600 hover:text-emerald-500"
      >
        <span className="sr-only">Previous month</span>
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      {/* Current Month Display */}
      <div className="mx-4 text-sm text-emerald-600 font-semibold">
        {targetYear}, {getMonthName(targetMonth)}
      </div>

      {/* Next Month Button */}
      <button
        type="button"
        onClick={() => handleMonthChange("next")}
        className="-m-1.5 flex items-center justify-center p-1.5 text-emerald-600 hover:text-emerald-500"
      >
        <span className="sr-only">Next month</span>
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
