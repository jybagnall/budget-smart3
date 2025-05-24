"use server";

import supabase from "./supabase";
import { auth, signIn, signOut } from "./auth";
import { revalidatePath } from "next/cache";

export async function signInAction() {
  await signIn("google", { redirectTo: "/after-login" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function getAuthenticatedSessionId() {
  const session = await auth();

  if (!session || !session.user?.user_id) {
    return null;
  }

  return session.user.user_id;
}

export async function createCategory(category_name, dateId) {
  const user_id = await getAuthenticatedSessionId();

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
  const user_id = await getAuthenticatedSessionId();

  const { error } = await supabase
    .from("users")
    .delete()
    .eq("google_id", user_id);

  if (error) {
    throw new Error("Failed to delete user account" + error.message);
  }
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
}

export async function deleteCategory(categoryId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const { error: itemError } = await supabase
    .from("items")
    .delete()
    .eq("category_id", categoryId);

  if (itemError) {
    throw new Error("Failed to delete related items");
  }
  const { error: categoryError } = await supabase
    .from("categories")
    .delete()
    .eq("id", categoryId);

  if (categoryError) {
    throw new Error("Failed to delete requested category");
  }

  revalidatePath("/spent");
  revalidatePath("/spent/categories");
  revalidatePath("/spent/record-spending");
  revalidatePath("/history");
}

export async function editCategoryName(categoryName, categoryId) {
  const user_id = await getAuthenticatedSessionId();

  const { error } = await supabase
    .from("categories")
    .update({ category_name: categoryName })
    .eq("id", categoryId)
    .eq("user_id", user_id)
    .select();

  if (error) {
    throw new Error("Failed to update category name");
  }

  revalidatePath("/history");
  revalidatePath("/spent");
  revalidatePath("/spent/categories");
  revalidatePath("/spent/record-spending");
}

export async function editItem(itemId, itemName, itemAmount) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const data = {
    item_name: itemName,
    spent_amount: itemAmount,
  };

  const { error } = await supabase
    .from("items")
    .update(data)
    .eq("id", itemId)
    .select();

  if (error) {
    throw new Error("Failed to update item");
  }

  revalidatePath("/history");
  revalidatePath("/spent");
  revalidatePath("/spent/categories");
  revalidatePath("/spent/record-spending");
}

export async function deleteThisMonth(dateId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const { error } = await supabase.from("dates").delete().eq("id", dateId);

  if (error) {
    throw new Error("Failed to delete requested month");
  }

  revalidatePath("/history");
  revalidatePath("/spent");
  revalidatePath("/spent/categories");
  revalidatePath("/spent/record-spending");
  revalidatePath("/settings");
}
