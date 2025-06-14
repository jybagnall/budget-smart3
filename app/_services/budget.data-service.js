"use server";
import supabase from "./supabase";
import { notFound } from "next/navigation";
import { auth } from "./auth";
import { getAuthenticatedSessionId } from "./actions";
import { getMonthName } from "./utils";
import { getLastThreeMonths, getMonthAndYear } from "./date.data-service";

export async function setBudget(dateData, data) {
  const user_id = await getAuthenticatedSessionId();

  const date = {
    year: dateData.targetYear,
    month: dateData.targetMonth + 1,
    user_id,
  };

  const { data: existingDate, error: fetchError } = await supabase
    .from("dates")
    .select("id")
    .eq("user_id", user_id)
    .eq("month", dateData.targetMonth + 1)
    .eq("year", dateData.targetYear)
    .single();

  let date_id;

  if (fetchError && fetchError.code !== "PGRST116") {
    throw new Error("Error checking existing date");
  }

  if (existingDate) {
    date_id = existingDate.id;
  } else {
    const { data: insertedData, error: insertError } = await supabase
      .from("dates")
      .insert([date])
      .select("id")
      .single();

    if (insertError) {
      throw new Error("Date could not be created");
    }
    date_id = insertedData.id;
  }

  const budget = {
    amount: Number(data.targetSpending),
    date_id,
  };

  const { error: budgetError } = await supabase
    .from("budgets")
    .insert([budget]);

  if (budgetError) {
    if (budgetError.code === "23505") {
      throw new Error("A budget already exists for this month.");
    }
    throw new Error("Budget could not be created");
  }
  return date_id;
}

export async function getCategories(dateId) {
  const user_id = await getAuthenticatedSessionId();

  const { data, error } = await supabase
    .from("categories")
    .select("id, category_name")
    .eq("user_id", user_id)
    .eq("date_id", dateId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    notFound();
  }

  return Array.isArray(data) ? data : [];
}

export async function getItemsPerCategory(dateId, categoryId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const { data, error } = await supabase
    .from("items")
    .select("id, item_name, spent_amount")
    .eq("date_id", dateId)
    .eq("category_id", categoryId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    notFound();
  }

  return Array.isArray(data) ? data : [];
}

export async function getTotalSumPerCategory(dateId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const { data, error } = await supabase
    .from("items")
    .select("category_id, spent_amount, categories(category_name)")
    .eq("date_id", dateId);

  if (error) {
    console.error(error);
    notFound();
  }

  const categoryTotals = {}; // hold **one entry per category

  for (const item of data || []) {
    const categoryId = item.category_id;
    const categoryName = item.categories?.category_name || "Unknown";
    const spent = Number(item.spent_amount) || 0;

    if (!categoryTotals[categoryId]) {
      categoryTotals[categoryId] = {
        category_id: categoryId,
        category_name: categoryName,
        total: 0,
      };
    }

    categoryTotals[categoryId].total += spent;
  }

  const convertedToArray = Object.values(categoryTotals);

  return convertedToArray;
}

export async function getTotalSpending(dateId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const { data, error } = await supabase
    .from("items")
    .select("spent_amount")
    .eq("date_id", dateId);

  if (error) {
    console.error(error);
    notFound();
  }

  const total =
    data?.reduce((sum, row) => sum + Number(row.spent_amount), 0) ?? 0;

  return total;
}

export async function getThisMonthBudget(dateId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const { data, error } = await supabase
    .from("budgets")
    .select("amount")
    .eq("date_id", dateId)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }

  return data.amount;
}

export async function getThreeBiggestPurchase(dateId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const { data, error } = await supabase
    .from("items")
    .select("item_name, spent_amount")
    .eq("date_id", dateId)
    .order("spent_amount", { ascending: false })
    .limit(3);

  if (error) {
    console.error(error);
    notFound();
  }

  return data || [];
}

export async function getLastThreeMonthsSummary() {
  const lastThreeMonthsIds = await getLastThreeMonths();

  const results = await Promise.all(
    lastThreeMonthsIds.map(async ({ id }) => {
      const [totalSpending, budget, dateInfo] = await Promise.all([
        getTotalSpending(id),
        getThisMonthBudget(id),
        getMonthAndYear(id),
      ]);

      return {
        date: {
          month: getMonthName(dateInfo.month - 1),
          year: dateInfo.year,
        },
        actual_spending: totalSpending,
        budget,
        status: budget - totalSpending,
      };
    })
  );

  return results;
}

export async function getTopSpendingCategoriesByMonth() {
  const lastThreeMonthsIds = await getLastThreeMonths();

  const result = await Promise.all(
    lastThreeMonthsIds.map(async ({ id }) => {
      const arrayOfAllCategories = await getTotalSumPerCategory(id);
      const sorted = [...arrayOfAllCategories].sort(
        (a, b) => b.total - a.total
      );

      const topCategory = sorted[0];

      if (!topCategory) return null;

      const { month } = await getMonthAndYear(id);

      return {
        category: topCategory.category_name,
        total: topCategory.total,
        monthName: getMonthName(month - 1),
      };
    })
  );

  return result.filter(Boolean);
}
