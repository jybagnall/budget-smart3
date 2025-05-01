import { getCategories } from "@/app/_services/data-service";
import CategoryCard from "./CategoryCard";
import EmptyCategoryCard from "@/app/_components/EmptyCategoryCard";

export default async function CategoryList({ dateId }) {
  const categories = await getCategories(dateId);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <EmptyCategoryCard refreshCategories={getCategories} dateId={dateId} />

      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category_name={category.category_name}
        />
      ))}
    </div>
  );
}
