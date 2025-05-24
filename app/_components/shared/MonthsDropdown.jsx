"use client";
import { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useRouter } from "next/navigation";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useMonthContext } from "@/app/_context/dateContext";
import { getMonthName } from "@/app/_services/utils";

export default function MonthDropdown({ dates }) {
  const [selected, setSelected] = useState(dates[0]);
  const [isNavigating, setIsNavigating] = useState(false);

  const { setTargetMonth, setTargetYear, setDateId } = useMonthContext();
  const router = useRouter();

  const handleNavigate = (id) => {
    const twoWeeks = 60 * 60 * 24 * 14;
    document.cookie = `dateId=${id}; path=/; max-age=${twoWeeks}`;

    router.push(`/spent/categories`);
  };

  const handleChange = (value) => {
    setSelected(value);
    setTargetMonth(value.month);
    setTargetYear(value.year);
    setDateId(value.id);

    setIsNavigating(true);
    handleNavigate(value.id);
  };

  return (
    <div className="w-full">
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative mt-2">
          <ListboxButton className="relative w-full cursor-default rounded-lg border border-gray-300 bg-white py-3 pl-4 pr-10 text-left shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-sm">
            <span className="block truncate">
              {getMonthName(selected.month - 1)}, {selected.year}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <ListboxOptions className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {dates.map((date) => (
              <ListboxOption
                key={date.id}
                value={date}
                className="relative cursor-default select-none py-2 pl-4 pr-10 hover:bg-stone-50"
              >
                <span className="block truncate">
                  {getMonthName(date.month - 1)}, {date.year}
                </span>
                {selected.id === date.id && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-emerald-600">
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>

      <button
        onClick={() => handleNavigate(selected.id)}
        disabled={isNavigating}
        className="mt-6 w-full rounded-lg bg-emerald-500 px-4 py-3 text-white font-medium shadow hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        {isNavigating ? "Navigating..." : "Continue to Budget"}
      </button>
    </div>
  );
}
