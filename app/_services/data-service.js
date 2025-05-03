"use server";
import supabase from "./supabase";
import { notFound } from "next/navigation";
import { auth } from "./auth";
import { revalidatePath } from "next/cache";

export async function createUser(newUser) {
  const { data, error } = await supabase.from("users").insert([newUser]);

  if (error) {
    console.error(error);
    throw new Error("User could not be created");
  }

  return data;
}

export async function getUser(email) {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  return data;
}

export async function getTargetMonthAfterLogin() {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const { data, error } = await supabase
    .from("dates")
    .select("id, year, month")
    .eq("user_id", session.user.user_id);

  if (error) {
    throw new Error("Could not fetch date data");
  }

  if (!data || data.length === 0) {
    return { status: "empty" };
  } else if (data.length === 1) {
    return { date: data[0], status: "single" };
  } else {
    return { dates: data, status: "multiple" };
  }
}

export async function getMonthAndYear(date_id) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const { data, error } = await supabase
    .from("dates")
    .select("month, year")
    .eq("user_id", session.user.user_id)
    .eq("id", date_id)
    .single();

  if (error) {
    throw new Error("Could not fetch date data");
  }

  return data;
}

export async function setBudget(dateData, data) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const date = {
    year: dateData.targetYear,
    month: dateData.targetMonth + 1,
    user_id: session.user.user_id,
  };

  const { data: existingDate, error: fetchError } = await supabase
    .from("dates")
    .select("id")
    .eq("user_id", session.user.user_id)
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
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const { data, error } = await supabase
    .from("categories")
    .select("id, category_name")
    .eq("user_id", session.user.user_id)
    .eq("date_id", dateId);

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
    .eq("category_id", categoryId);

  if (error) {
    console.error(error);
    notFound();
  }

  return Array.isArray(data) ? data : [];
}
