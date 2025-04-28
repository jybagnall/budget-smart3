"use server";
import supabase from "./supabase";
import { notFound } from "next/navigation";
import { auth } from "./auth";

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
    return { date: data, status: "multiple" };
  }
}
