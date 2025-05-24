import { getThreeBiggestPurchase } from "@/app/_services/budget.data-service";

export default async function BiggestPurchase({ dateId }) {
  const purchasesInArray = await getThreeBiggestPurchase(dateId);

  if (purchasesInArray.length === 0) {
    return (
      <p className="text-gray-500 text-base italic">
        No purchases yet this month.
      </p>
    );
  }

  const purchaseNames = purchasesInArray
    .map((each) => each.item_name)
    .join(", ");

  return <p className="mt-2 text-gray-500 text-base italic">{purchaseNames}</p>;
}
