import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createUser, getUser } from "./user.data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },

    async signIn({ user }) {
      try {
        if (!user?.email) {
          return false;
        }

        const existingUser = await getUser(user.email);

        if (!existingUser)
          await createUser({
            email: user.email,
            name: user.name,
            google_id: user.id,
          });

        return true;
      } catch {
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
        console.error("❌ session callback error:", err);
        return null;
      }
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth-error",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
