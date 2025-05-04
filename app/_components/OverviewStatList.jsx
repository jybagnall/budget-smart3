import {
  getThisMonthBudget,
  getTotalSpending,
  getTotalSumPerCategory,
} from "../_services/data-service";
import { formatMoney } from "../_services/utils";
import OverviewStatBox from "./OverviewStatBox";

export default async function OverviewStatList({ dateId }) {
  const totalSpending = await getTotalSpending(dateId);
  const budget = await getThisMonthBudget(dateId);
  const remainingBudget = Number(budget) - Number(totalSpending);

  const totalSumPerCategory = await getTotalSumPerCategory(dateId);
  const topThreeCategories = totalSumPerCategory?.slice(0, 3)

  return (
    <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-3 lg:px-3 xl:px-0">
      <OverviewStatBox label="Total Expenditure To Date">
        $ {formatMoney(totalSpending)}/{formatMoney(budget)}
      </OverviewStatBox>

      <OverviewStatBox label="Remaining Budget">
        $ {formatMoney(remainingBudget)}
      </OverviewStatBox>
      <OverviewStatBox label="Top 3 Expenditure"></OverviewStatBox>
    </dl>
  );
}

{
  /* <div
          aria-hidden="true"
          className="absolute top-full left-0 -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-mt-10 sm:-ml-96 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50"
        >
          <div
            style={{
              clipPath:
                "polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)",
            }}
            className="aspect-1154/678 w-[72.125rem] bg-linear-to-br from-[#FF80B5] to-[#9089FC]"
          />
        </div> */
}
