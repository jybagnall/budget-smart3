import { auth } from "@/app/_services/auth";
import { NextResponse } from "next/server";

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

// export async function middleware(request) {
//   const session = await auth();

//   const { pathname } = request.nextUrl;

//   if (session?.user && pathname === "/login") {
//     return NextResponse.redirect(new URL("/spent/categories", request.url));
//   }

//   if (!session?.user) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next(); // allow
// }
