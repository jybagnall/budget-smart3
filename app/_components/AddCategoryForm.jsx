"use client";
import { useForm } from "react-hook-form";
import { CheckIcon } from "@heroicons/react/24/outline";
import { createCategory } from "@/app/_services/data-service";
import { useMonthContext } from "@/app/_context/dateContext";
import { getMonthName } from "../_services/utils";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

export default function AddCategoryForm({
  showForm,
  setShowForm,
  dateId,
  refreshCategories,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { targetMonth, targetYear } = useMonthContext();

  const onSubmit = async (data) => {
    try {
      await createCategory(data.category_name, dateId);
      await refreshCategories();
      setShowForm(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <Dialog open={showForm} onClose={() => setShowForm(false)} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 flex items-center justify-center p-4 overflow-y-auto">
        <DialogPanel className="relative w-full max-w-md transform rounded-2xl bg-white px-8 py-12 text-center shadow-xl transition-all min-h-[300px]">
          <h2 className="mb-6 text-lg font-semibold text-gray-900">
            {getMonthName(targetMonth - 1)}, {targetYear}
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full mt-6 bg-white px-4"
          >
            <div className="w-full max-w-lg space-y-6 bg-gray-50 p-2 rounded-lg shadow-md">
              <div className="flex items-center space-x-3">
                <input
                  {...register("category_name", {
                    required: "Please enter the category name",
                  })}
                  type="text"
                  name="category_name"
                  id="category_name"
                  className="block rounded-md w-full bg-gray-50 py-2 px-3 text-base text-gray-900 placeholder:text-gray-400 sm:text-sm focus:outline-none focus:ring-0 focus:border-transparent"
                  placeholder="Category name (ex. Food)"
                />
                {errors.category_name && (
                  <span className="mt-2 text-xs text-red-600">
                    {errors.category_name.message}
                  </span>
                )}
                <button
                  type="submit"
                  title="save"
                  className="p-2 text-green-600 hover:text-green-500"
                >
                  <CheckIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
