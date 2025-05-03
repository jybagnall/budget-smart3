import { getItemsPerCategory } from "@/app/_services/data-service";

export default async function SpendingList({ dateId, category_id }) {
  const items = await getItemsPerCategory(dateId, category_id);

  return items.map((item, index) => (
    <dl
      key={item.id}
      className={`py-3 text-md ${
        index !== items.length - 1 ? "border-b border-gray-200" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <dt className="text-gray-800 w-2/3 pl-3">{item.item_name}</dt>
        <dd className="text-gray-800 w-36 text-right pr-20 whitespace-nowrap">
          <span className="mr-1">$</span>
          {item.spent_amount}
        </dd>
      </div>
    </dl>
  ));
}
