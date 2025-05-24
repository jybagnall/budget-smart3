"use client";
import { useRouter } from "next/navigation";
import Card from "../shared/Card";
import { getMonthName } from "@/app/_services/utils";

export default function MonthPanelMultiple({ dates }) {
  const router = useRouter();

  const handleNavigate = (id) => {
    const twoWeeks = 60 * 60 * 24 * 14;
    document.cookie = `dateId=${id}; path=/; max-age=${twoWeeks}`;

    router.push(`/spent/categories`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {dates.map((date) => (
        <Card
          key={date.id}
          name={`${getMonthName(date.month - 1)}, ${date.year}`}
          navigateTo={() => handleNavigate(date.id)}
        />
      ))}
    </div>
  );
}
