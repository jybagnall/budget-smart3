import { CheckIcon } from "@heroicons/react/24/outline";
import { applyRandomColor, formatMoney } from "../_services/utils";

export default function ChartExplanation({ totalSumPerCategory }) {
  return (
    <div className="flow-root mt-5">
      <ul role="list">
        {totalSumPerCategory.map((category, index) => (
          <li key={category.category_name}>
            <div className="relative pb-8">
              {index < totalSumPerCategory.length - 1 && (
                <span
                  className="absolute left-2.5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}

              <div className="relative flex items-center space-x-3">
                <span
                  className={`flex size-5 items-center justify-center rounded-full ring-4 ring-white ${applyRandomColor(
                    category.category_name
                  )}`}
                >
                  <CheckIcon
                    className="w-4 h-4 text-white"
                    aria-hidden="true"
                  />
                </span>

                <div className="grid grid-cols-[auto_80px] items-center gap-x-4">
                  <p className="text-sm text-gray-500 truncate">
                    {category.category_name}
                  </p>
                  <p className="text-sm text-gray-500 text-left w-full">
                    ${formatMoney(category.total)}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
