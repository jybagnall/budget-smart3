import { getItemsPerCategory } from "@/app/_services/data-service";
import SpendingListPanel from "./SpendingListPanel";

export default async function SpendingList({ dateId, category_id }) {
  const items = await getItemsPerCategory(dateId, category_id);

  return (
    <>
      <SpendingListPanel items={items} />
    </>
  );
}
