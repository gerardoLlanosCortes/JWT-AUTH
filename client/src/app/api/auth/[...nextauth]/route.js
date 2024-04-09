import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { signOut } from "next-auth/react";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`http://localhost:3001/api/v1/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        console.log(user);

        if (user.id) {
          return user;
        } else return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log(token, user);
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      const decodedToken = jwt.decode(token.refresh_token);
      if (Date.now() > decodedToken.exp * 1000) {
        await signOut();
        return;
      }

      session.user = token;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
