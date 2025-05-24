"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDownIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { getMonthName } from "@/app/_services/utils";
import OverviewHeaderMonthSelector from "./OverviewHeaderMonthSelector";

export default function OverviewHeader({
  currentMonth,
  currentYear,
  allMonthsAndYears,
  dateId,
}) {
  const [showSelection, setShowSelection] = useState(false);

  const handleShowSelection = () => {
    setShowSelection((show) => !show);
  };

  return (
    <header className="pt-2 pb-4 sm:pb-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div className="flex flex-col gap-1">
          <div
            onClick={handleShowSelection}
            className="cursor-pointer inline-flex items-center gap-2"
          >
            <h1 className="text-xl font-semibold text-blue-600 whitespace-nowrap">
              {getMonthName(currentMonth - 1)}, {currentYear}
            </h1>

            {allMonthsAndYears.length > 1 && (
              <ChevronDownIcon
                aria-hidden="true"
                className="size-5 text-gray-500 hover:text-emerald-600 cursor-pointer sm:size-4"
              />
            )}
          </div>

          {showSelection && (
            <div className="mt-2 w-fit">
              <OverviewHeaderMonthSelector
                allMonthsAndYears={allMonthsAndYears}
                handleShowSelection={handleShowSelection}
                dateId={dateId}
              />
            </div>
          )}
        </div>

        <div className="text-gray-500 hover:text-gray-700 sm:self-start">
          <Link href="/set-budget" className="flex items-center gap-2">
            <PlusCircleIcon className="h-4 w-4 shrink-0" />
            <span className="text-sm leading-snug whitespace-normal">
              Add Budget for Another Month
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
