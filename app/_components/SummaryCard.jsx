import { formatMoney } from "@/app/_services/utils";

export default function SummaryCard({
  key,
  bgColor,
  head,
  body,
  status = null,
}) {
  return (
    <li key={key} className="col-span-1 flex rounded-md shadow-sm min-h-[50px]">
      <div
        className={`flex w-16 shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white ${bgColor}`}
      >
        {head}
      </div>

      <div className="flex flex-1 items-center justify-between rounded-r-md border border-gray-200 bg-white px-4 py-2 relative">
        <p className="font-medium text-sm text-gray-900 hover:text-gray-600">
          {body}
        </p>

        {status !== null && (
          <span
            className={`absolute top-2 right-4 text-xs font-semibold ${
              (status ?? 0) > 0 ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {status > 0 ? `+${formatMoney(status)}` : `-${formatMoney(status)}`}
          </span>
        )}
      </div>
    </li>
  );
}
