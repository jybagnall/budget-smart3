"use client";
import { useForm } from "react-hook-form";
import { CheckIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { editItem } from "@/app/_services/actions";

export default function EditItemInRecord({ item, isEditing, setIsEditing }) {
  const { id, item_name, spent_amount } = item;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (
      data.item_name.trim() === item_name.trim() &&
      data.spent_amount === spent_amount
    )
      return;

    try {
      await editItem(id, data.item_name, data.spent_amount);
      setIsEditing(false);
    } catch (error) {
      console.error("Error while editing the item", error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center gap-2 w-full max-w-3xl">
        <div className="flex-1 flex items-center rounded-lg bg-gray-50 px-4 py-3 shadow-sm">
          <input
            {...register("item_name", {
              required: "*Item name is required",
            })}
            type="text"
            name="item_name"
            defaultValue={item_name}
            autoFocus
            className="w-fit text-slate-700 placeholder-gray-400 bg-transparent focus:outline-none"
          />
        </div>

        <div className="w-36 flex items-center rounded-lg bg-gray-50 px-3 py-3 shadow-sm">
          <span className="text-gray-400 pl-10">$</span>
          <input
            {...register("spent_amount", {
              required: "*Please enter the amount",
              min: { value: 0, message: "*Amount must be positive" },
              maxLength: { value: 6, message: "Max 6 digits" },
            })}
            type="number"
            name="spent_amount"
            defaultValue={spent_amount}
            className="w-fittext-slate-700 placeholder-gray-400 bg-transparent focus:outline-none"
          />
        </div>

        {isEditing && (
          <button type="submit" className="ml-2">
            <CheckIcon className="h-5 w-5 text-emerald-600" />
          </button>
        )}
      </div>

      {errors.item_name && (
        <p className="text-red-500 text-sm">{errors.item_name.message}</p>
      )}
      {errors.spent_amount && (
        <p className="text-red-500 text-sm">{errors.spent_amount.message}</p>
      )}
    </form>
  );
}
