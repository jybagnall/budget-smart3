import { Suspense } from "react";
import { cookies } from "next/headers";
import CategoryList from "@/app/_components/CategoryList";
import Spinner from "@/app/_components/Spinner";
import { getMonthAndYear } from "@/app/_services/data-service";
import { getMonthName } from "@/app/_services/utils";

export default async function Page() {
  const cookieStore = await cookies();
  const dateId = cookieStore.get("dateId")?.value;

  const { month, year } = await getMonthAndYear(dateId);

  return (
    <div>
      <h2>
        {getMonthName(month - 1)}, {year}
      </h2>
      <div>
        <Suspense fallback={<Spinner />}>
          <CategoryList dateId={dateId} />
        </Suspense>
      </div>
    </div>
  );
}
