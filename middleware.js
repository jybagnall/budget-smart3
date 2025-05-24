import { auth } from "@/app/_services/auth";

export const middleware = auth;

export const config = {
  matcher: [
    "/history",
    "/spent",
    "/spent/categories",
    "/spent/record-spending",
    "/settings",
  ],
};
