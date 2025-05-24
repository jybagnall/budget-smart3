"use client";
import { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import EditItemInRecord from "@/app/_components/budget/EditItemInRecord";

export default function SpendingListPanel({ items }) {
  const [isEditing, setIsEditing] = useState(false);

  return items.map((item, index) => (
    <dl
      key={item.id}
      className={`py-3 text-md ${
        index !== items.length - 1 ? "border-b border-gray-200" : ""
      }`}
    >
      {isEditing ? (
        <EditItemInRecord
          item={item}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      ) : (
        <div className="flex justify-between items-center group">
          <dt className="text-gray-800 w-2/3 pl-3">{item.item_name}</dt>
          <dd className="text-gray-800 w-36 text-right pr-20 whitespace-nowrap">
            <span className="mr-1">$</span>
            {item.spent_amount}
          </dd>

          <button
            onClick={() => setIsEditing(true)}
            className="ml-2 hidden group-hover:inline-block text-gray-400 hover:text-emerald-600"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </dl>
  ));
}
