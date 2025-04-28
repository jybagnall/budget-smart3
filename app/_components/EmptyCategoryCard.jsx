"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function EmptyCategoryCard() {
  const router = useRouter(); // router.push("/")

  return (
    <div
      onClick={() => {}}
      className="flex flex-col items-center justify-center h-30 border border-dashed border-gray-300 rounded-lg bg-white text-center p-6 shadow-sm cursor-pointer hover:border-emerald-500 hover:text-emerald-500 transition-colors"
    >
      <PlusIcon className="h-8 w-8 mb-4" />
      <h2 className="text-lg font-medium">Add Categories</h2>
    </div>
  );
}
