"use client";

import { useRouter } from "next/navigation";
import Card from "@/app/_components/shared/Card";
import EmptyCategoryCard from "@/app/_components/budget/EmptyCategoryCard";

export default function CategoryList({ dateId, categories }) {
  const router = useRouter();

  const handleNavigate = (categoryId) => {
    router.push(`/spent/record-spending?dateId=${dateId}#${categoryId}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <EmptyCategoryCard dateId={dateId} />

      {categories.map((category) => (
        <Card
          key={category.id}
          name={category.category_name}
          navigateTo={() => handleNavigate(category.category_id)}
        />
      ))}
    </div>
  );
}
