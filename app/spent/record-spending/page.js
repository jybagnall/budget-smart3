import { cookies } from "next/headers";
import { Suspense } from "react";
import AddItemForm from "@/app/_components/AddItemForm";
import { getCategories } from "@/app/_services/data-service";
import ScrollToHash from "@/app/_components/ScrollToHash";
import SpendingList from "@/app/_components/SpendingList";
import Spinner from "@/app/_components/Spinner";

export default async function Page({ searchParams }) {
  const cookieStore = await cookies();
  const fallbackDateId = cookieStore.get("dateId")?.value;
  const { dateId } = await searchParams;

  const newDateId = dateId || fallbackDateId;

  const categories = await getCategories(newDateId);

  return (
    <ul role="list" className="space-y-6 px-4 max-w-3xl mx-auto">
      {categories.map((category) => (
        <li
          key={category.id}
          id={category.id}
          className="rounded-xl border border-gray-200 bg-white shadow-sm p-6"
          style={{ scrollMarginTop: "6rem" }}
        >
          <div className="mb-4 text-lg font-semibold text-emerald-600">
            {category.category_name}
          </div>

          <AddItemForm category_id={category.id} dateId={newDateId} />

          <Suspense fallback={<Spinner />}>
            <SpendingList dateId={newDateId} category_id={category.id} />
          </Suspense>
        </li>
      ))}
      <ScrollToHash />
    </ul>
  );
}
