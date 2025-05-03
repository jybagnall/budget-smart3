"use client";

import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function CategoryCard({ category_name, category_id, dateId }) {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(`/spent/record-spending?dateId=${dateId}#${category_id}`)
      }
      className="relative flex flex-col items-center justify-center h-32 w-full sm:w-56 border border-gray-300 rounded-lg bg-white text-center p-6 shadow-sm cursor-pointer hover:border-emerald-500 hover:text-emerald-500 transition-colors"
    >
      <div className="absolute top-2 right-2 text-gray-600 group-hover:text-emerald-500">
        <ArrowUpRightIcon className="w-4 h-4" />
      </div>

      <h2 className="text-lg font-medium">{category_name}</h2>
    </div>
  );
}
