import {
  getThisMonthBudget,
  getTotalSpending,
} from "../_services/data-service";
import Image from "next/image";
import { formatMoney, getTopThreeNames } from "../_services/utils";
import OverviewStatBox from "./OverviewStatBox";

export default async function OverviewStatList({
  dateId,
  totalSumPerCategory,
}) {
  const totalSpending = await getTotalSpending(dateId);
  const budget = await getThisMonthBudget(dateId);
  const remainingBudget = Number(budget) - Number(totalSpending);
  const isOverBudget = Number(totalSpending) > Number(budget);

  const topThreeNames = await getTopThreeNames(totalSumPerCategory);

  return (
    <div className="relative">
      <Image
        src="/green-bg.JPG"
        alt="background"
        fill
        priority
        className="object-cover object-center -z-10"
      />
      <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-3 lg:px-3 xl:px-0 bg-white/80 backdrop-blur-sm">
        <OverviewStatBox label="Total Expenditure To Date">
          <p
            className={`text-xl font-bold ${
              isOverBudget ? "text-red-700" : "text-green-600 "
            }`}
          >
            $ {formatMoney(totalSpending)}
            <span className="ml-2 text-base text-gray-500">
              / {formatMoney(budget)}
            </span>
          </p>{" "}
        </OverviewStatBox>

        <OverviewStatBox label="Remaining Budget">
          $ {formatMoney(remainingBudget)}
        </OverviewStatBox>

        <OverviewStatBox label="Top 3 Expenditure">
          {topThreeNames}
        </OverviewStatBox>
      </dl>
    </div>
  );
}
