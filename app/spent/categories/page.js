import { Suspense } from "react";
import { cookies } from "next/headers";
import CategoryList from "@/app/_components/budget/CategoryList";
import Spinner from "@/app/_components/shared/Spinner";
import { getCategories } from "@/app/_services/budget.data-service";
import { getMonthAndYear } from "@/app/_services/date.data-service";
import { getMonthName } from "@/app/_services/utils";

export const metadata = {
  title: "Monthly Categories",
};

export default async function Page() {
  const cookieStore = await cookies();
  const dateId = cookieStore.get("dateId")?.value;

  const categories = await getCategories(dateId);

  const { month, year } = await getMonthAndYear(dateId);

  return (
    <div>
      <h2 className="mb-3 text-blue-500 font-bold text-xl">
        {getMonthName(month - 1)}, {year}
      </h2>
      <div>
        <Suspense fallback={<Spinner />}>
          <CategoryList dateId={dateId} categories={categories} />
        </Suspense>
      </div>
    </div>
  );
}
