"use client";
import { useForm } from "react-hook-form";
import { CheckIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { editCategoryName } from "@/app/_services/actions";

export default function EditCategoryHeaderInRecord({
  category,
  isEditing,
  setIsEditing,
}) {
  const { id, category_name } = category;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.category_name.trim() === category_name.trim()) return;

    try {
      await editCategoryName(data.category_name, id);
      setIsEditing(false);
    } catch (error) {
      console.error("Error editing category name", error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-4 flex items-center w-full"
    >
      <input
        {...register("category_name", {
          required: "Category name is required",
        })}
        type="text"
        name="category_name"
        defaultValue={category_name}
        autoFocus
        className="w-fit border-b-2 border-emerald-600 text-slate-700 placeholder-gray-400 bg-transparent focus:outline-none"
      />
      {isEditing && (
        <button type="submit" className="ml-2">
          <CheckIcon className="h-5 w-5 text-emerald-600" />
        </button>
      )}

      {errors.category_name && (
        <p className="text-red-500 text-sm">{errors.category_name.message}</p>
      )}
    </form>
  );
}
