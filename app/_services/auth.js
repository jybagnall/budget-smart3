import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
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
      const loggedIn_user = await getUser(session.user.email);

      if (!loggedIn_user) {
        return null;
      }

      session.user.user_id = loggedIn_user.google_id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
