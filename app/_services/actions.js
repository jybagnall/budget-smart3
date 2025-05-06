"use server";

import supabase from "./supabase";
import { auth, signIn, signOut } from "./auth";
import { redirect } from "next/navigation";

import { revalidatePath } from "next/cache";

export async function signInAction() {
  await signIn("google", { redirectTo: "/after-login" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function getAuthenticatedUserId() {
  const session = await auth();

  if (!session || !session.user?.user_id) {
    throw new Error("You must be logged in with valid session data.");
  }

  return session.user.user_id;
}

export async function createCategory(category_name, dateId) {
  const user_id = await getAuthenticatedUserId();

  const data = {
    category_name,
    user_id,
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

export async function deleteUserAccount() {
  const user_id = await getAuthenticatedUserId();

  const { error } = await supabase.from("users").delete().eq("id", user_id);

  if (error) {
    throw new Error("Failed to delete user account");
  }

  revalidatePath("/settings");
  redirect("/settings/delete-confirmation");
}

export async function resetSpendingRecords(dateId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const { error } = await supabase.from("items").delete().eq("date_id", dateId);

  if (error) {
    throw new Error("Failed to delete spending records");
  }

  revalidatePath("/spent");
  revalidatePath("/spent/categories");
  revalidatePath("/spent/record-spending");

  redirect("/spent");
}
