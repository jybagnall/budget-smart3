"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import AddCategoryForm from "./AddCategoryForm";

export default function EmptyCategoryCard({ refreshCategories, dateId }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          setShowForm(true);
        }}
        className="flex flex-col items-center justify-center h-32 w-full sm:w-56 border border-dashed border-gray-300 rounded-lg bg-white text-center p-6 shadow-sm cursor-pointer hover:border-emerald-500 hover:text-emerald-500 transition-colors"
      >
        <PlusIcon className="h-8 w-8 mb-4" />
        <h2 className="text-lg font-medium">Add Categories</h2>
      </div>

      {showForm && (
        <AddCategoryForm
          showForm={showForm}
          setShowForm={setShowForm}
          dateId={dateId}
          refreshCategories={refreshCategories}
        />
      )}
    </>
  );
}
