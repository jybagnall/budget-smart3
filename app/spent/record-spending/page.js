import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import { getCategories } from "@/app/_services/budget.data-service";
import { deleteCategory } from "@/app/_services/actions";
import AddItemForm from "@/app/_components/budget/AddItemForm";
import ScrollToHash from "@/app/_components/app_setting/ScrollToHash";
import SpendingList from "@/app/_components/budget/SpendingList";
import Spinner from "@/app/_components/shared/Spinner";
import CategoryHeaderInRecord from "@/app/_components/budget/CategoryHeaderInRecord";

export const metadata = {
  title: "Add Expenses",
};

export default async function Page({ searchParams }) {
  const cookieStore = await cookies();
  const fallbackDateId = cookieStore.get("dateId")?.value;
  const { dateId } = await searchParams;

  const newDateId = dateId || fallbackDateId;

  const categories = await getCategories(newDateId);

  return (
    <>
      {categories.length === 0 ? (
        <div className="text-gray-500 hover:text-gray-700 mt-5 text-lg">
          <Link
            href="/spent/categories"
            className="inline-flex items-start gap-2 flex-nowrap"
          >
            <PlusCircleIcon className="h-4 w-4 shrink-0 mt-1" />
            <span className="leading-tight">
              No categories yet. Start by adding expenses for this month.
            </span>
          </Link>
        </div>
      ) : (
        <ul role="list" className="space-y-6 px-4 max-w-3xl mx-auto">
          {categories.map((category) => (
            <li
              key={category.id}
              id={category.id}
              className="rounded-xl border border-gray-200 bg-white shadow-sm p-6"
              style={{ scrollMarginTop: "6rem" }}
            >
              <CategoryHeaderInRecord
                category={category}
                deleteCategory={deleteCategory}
              />

              <AddItemForm category_id={category.id} dateId={newDateId} />

              <Suspense fallback={<Spinner />}>
                <SpendingList dateId={newDateId} category_id={category.id} />
              </Suspense>
            </li>
          ))}
          <ScrollToHash />
        </ul>
      )}
    </>
  );
}
