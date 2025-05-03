"use server";

import supabase from "./supabase";
import { auth, signIn, signOut } from "./auth";
import { redirect } from "next/navigation";

import { revalidatePath } from "next/cache";
import { getTargetMonthAfterLogin } from "./data-service";

export async function signInAction() {
  await signIn("google", { redirectTo: "/after-login" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function createCategory(category_name, dateId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const data = {
    category_name,
    user_id: session.user.user_id,
    date_id: dateId,
  };

  const { error } = await supabase.from("categories").insert([data]).select();

  if (error) {
    throw new Error("Category could not be created");
  }

  revalidatePath(`/spent/categories`);
}

export async function createItem(item_name, spent_amount, dateId, categoryId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  if (!item_name || !spent_amount || !dateId || !categoryId) {
    throw new Error("Missing required fields");
  }

  const data = {
    item_name,
    spent_amount: spent_amount,
    date_id: dateId,
    category_id: categoryId,
  };

  const { error } = await supabase.from("items").insert([data]).select();

  if (error) {
    throw new Error("Spending item could not be created");
  }

  revalidatePath("/spent/record-spending");
}
