"use client";
import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import ConfirmationModalMsg from "@/app/_components/shared/ConfirmationModalMsg";
import EditCategoryHeaderInRecord from "./EditCategoryHeaderInRecord";

export default function CategoryHeaderInRecord({ category, deleteCategory }) {
  const { id, category_name } = category;

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <>
      {isEditing ? (
        <EditCategoryHeaderInRecord
          category={category}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      ) : (
        <div className="mb-4 flex items-center gap-3">
          <p className="text-lg font-semibold text-emerald-600">
            {category_name}
          </p>

          <span onClick={() => setIsEditing(true)}>
            <PencilIcon className="w-5 h-5 text-gray-500 hover:text-gray-800" />
          </span>
          <span onClick={() => setIsDeleting(true)}>
            <TrashIcon className="w-5 h-5 text-gray-500 hover:text-gray-800" />
          </span>
        </div>
      )}

      {isDeleting && (
        <ConfirmationModalMsg
          serverAction={() => {
            deleteCategory(id);
          }}
          deleteMsg="Delete category & records"
        />
      )}
    </>
  );
}
