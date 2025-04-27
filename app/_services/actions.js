"use server";

import supabase from "./supabase";
import { auth, signIn, signOut } from "./auth";

export async function signInAction() {
  await signIn("google", { redirectTo: "/set-budget" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
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
}
