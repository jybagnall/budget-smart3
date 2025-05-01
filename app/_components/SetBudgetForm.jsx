"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import SaveButton from "@/app/_components/SaveButton";
import { useMonthContext } from "@/app/_context/dateContext";
import { setBudget } from "@/app/_services/data-service";
import MonthSelector from "@/app/_components/MonthSelector";

export default function SetBudgetForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    targetMonth,
    targetYear,
    setTargetMonth,
    setTargetYear,
    setDateId,
    handleMonthChange,
    isSubmittingPast,
  } = useMonthContext();

  const router = useRouter();

  const dateData = { targetMonth, targetYear };

  const onSubmit = async (data) => {
    if (isSubmittingPast()) {
      toast.error("A budget for a past month or year cannot be set.");
      return;
    }

    try {
      const newDateId = await setBudget(dateData, data);
      setTargetMonth(dateData.targetMonth);
      setTargetYear(dateData.targetYear);
      setDateId(newDateId);

      toast.success("Budget set successfully!");
      router.push("/spent/categories");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to set budget. Please try again!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <MonthSelector
        handleMonthChange={handleMonthChange}
        targetYear={targetYear}
        targetMonth={targetMonth}
      />

      <label
        htmlFor="targetSpending"
        className="block text-lg font-semibold text-gray-900"
      >
        What is your spending target?
      </label>

      <div className="relative mt-4">
        <div className="flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 focus-within:border-indigo-500">
          <span className="text-gray-500">$</span>
          <input
            {...register("targetSpending", {
              required: "Please enter your target spending",
              min: { value: 0, message: "Amount must be positive" },
            })}
            type="number"
            name="targetSpending"
            id="targetSpending"
            min="0"
            className="block w-full border-none bg-transparent px-2 text-lg text-gray-900 placeholder-gray-400 focus:outline-none"
            placeholder="0.00"
            aria-describedby="price-currency"
          />
          <span id="price-currency" className="text-gray-500">
            USD
          </span>
        </div>
        {errors.targetSpending?.message && (
          <span className="mt-2 text-xs text-red-600">
            {errors.targetSpending.message}
          </span>
        )}
      </div>

      <SaveButton bgColor={"bg-stone-100"} />
    </form>
  );
}
