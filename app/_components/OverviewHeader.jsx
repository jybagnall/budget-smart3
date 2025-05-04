import { getMonthAndYear } from "../_services/data-service";
import { getMonthName } from "../_services/utils";

export default async function OverviewHeader({ dateId }) {
  const { month, year } = await getMonthAndYear(dateId);

  return (
    <header className="pt-6 pb-4 sm:pb-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
        <h1 className="text-base/7 font-semibold text-gray-900">
          {getMonthName(month - 1)}, {year}
        </h1>
      </div>
    </header>
  );
}
