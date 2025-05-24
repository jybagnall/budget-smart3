import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUser, getUser } from "./user.data-service";

const { AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, NEXTAUTH_SECRET, NEXTAUTH_URL } =
  process.env;

if (!AUTH_GOOGLE_ID || !AUTH_GOOGLE_SECRET || !NEXTAUTH_SECRET) {
  throw new Error("Missing required env vars for NextAuth.");
}

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: AUTH_GOOGLE_ID,
      clientSecret: AUTH_GOOGLE_SECRET,
    }),
  ],
  secret: NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      try {
        const existingUser = await getUser(user.email);
        if (!existingUser) {
          await createUser({
            email: user.email,
            name: user.name,
            google_id: user.id,
          });
        }
        return true;
      } catch (err) {
        console.error("signIn callback error:", err);
        return false;
      }
    },
    async session({ session }) {
      try {
        const loggedInUser = await getUser(session.user.email);
        if (!loggedInUser) return null;
        session.user.user_id = loggedInUser.google_id;
        return session;
      } catch (err) {
        console.error("session callback error:", err);
        return null;
      }
    },
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authConfig);

export const GET = handler;
export const POST = handler;

export { nextAuth as auth, nextSignIn as signIn, nextSignOut as signOut };
