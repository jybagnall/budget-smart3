"use server";
import supabase from "./supabase";
import { notFound } from "next/navigation";
import { startOfMonth, subMonths } from "date-fns";
import { getAuthenticatedSessionId } from "./actions";

export async function getAvailableMonths() {
  const user_id = await getAuthenticatedSessionId();

  if (!user_id) return { status: null, date: null };

  const { data, error } = await supabase
    .from("dates")
    .select("id, year, month")
    .eq("user_id", user_id);

  if (error) {
    console.error("Supabase error:", error.message);
    return { status: "empty" };
  }

  if (!data || data.length === 0) {
    return { status: "empty" };
  } else if (data.length === 1) {
    return { date: data[0], status: "single" };
  } else {
    return { dates: data, status: "multiple" };
  }
}

export async function getMonthAndYear(dateId) {
  const user_id = await getAuthenticatedSessionId();

  const { data, error } = await supabase
    .from("dates")
    .select("month, year")
    .eq("user_id", user_id)
    .eq("id", dateId)
    .single();

  if (error) {
    throw new Error("Could not fetch date data");
  }

  return data;
}

export async function getLastThreeMonths() {
  const user_id = await getAuthenticatedSessionId();

  const now = startOfMonth(new Date()); // 2025-05-01T00:00:00.000Z
  const lastThreeMonths = [subMonths(now, 2), subMonths(now, 1), now];
  // lastThreeMonths = [ March 1, 2025, April 1, 2025, May 1, 2025 ];

  const orConditions = lastThreeMonths
    .map((d) => `and(year.eq.${d.getFullYear()},month.eq.${d.getMonth() + 1})`)
    .join(",");
  // "and(year.eq.2025,month.eq.3),and(year.eq.2025,month.eq.4), ..."

  const { data, error } = await supabase
    .from("dates")
    .select("id, month, year")
    .eq("user_id", user_id)
    .or(orConditions);

  if (error) {
    console.error(error);
    notFound();
  }

  if (!data || data.length === 0) {
    return [];
  }

  const sortedData = data.sort(
    (a, b) => new Date(a.year, a.month - 1) - new Date(b.year, b.month - 1)
  );

  return sortedData;
}

export async function getAllMonthAndYearInfo() {
  const user_id = await getAuthenticatedSessionId();

  const { data, error } = await supabase
    .from("dates")
    .select("id, month, year")
    .eq("user_id", user_id)
    .order("year", { ascending: true })
    .order("month", { ascending: true });

  if (error) {
    console.error(error);
    notFound();
  }

  if (!data || data.length === 0) {
    return [];
  }

  return data;
}
