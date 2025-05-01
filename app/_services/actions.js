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
