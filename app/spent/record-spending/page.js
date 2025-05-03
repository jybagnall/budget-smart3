import AddItemForm from "@/app/_components/AddItemForm";
import { getCategories } from "@/app/_services/data-service";
import ScrollToHash from "@/app/_components/ScrollToHash";
import SpendingList from "@/app/_components/SpendingList";

export default async function Page({ searchParams }) {
  const { dateId } = await searchParams;
  const categories = await getCategories(dateId);

  return (
    <ul role="list" className="space-y-6 px-4 max-w-3xl mx-auto">
      {categories.map((category) => (
        <li
          key={category.id}
          id={category.id}
          className="rounded-xl border border-gray-200 bg-white shadow-sm p-6"
          style={{ scrollMarginTop: "6rem" }}
        >
          <div className="mb-4 text-lg font-semibold text-gray-800">
            {category.category_name}
          </div>

          <AddItemForm category_id={category.id} dateId={dateId} />
          <SpendingList dateId={dateId} category_id={category.id} />
        </li>
      ))}
      <ScrollToHash />
    </ul>
  );
}
