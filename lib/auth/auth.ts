import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const { handlers, auth } = NextAuth({
  ...authOptions,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        const dbUser = await prisma.user.upsert({
          where: { email: user.email! },
          update: {
            name: user.name as string,
            image: user.image,
            emailVerified: new Date(),
          },
          create: {
            email: user.email!,
            name: user.name!,
            image: user.image,
            emailVerified: new Date(),
            password: "",
          },
        });

        // Add user data to token
        token.id = dbUser.id;
        token.email = dbUser.email;
        token.name = dbUser.name;
        token.picture = dbUser.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // Add user data from token to session
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name;
        session.user.image = token.picture as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Handle redirect after sign in
      if (url.startsWith(baseUrl)) return url;
      else if (url.startsWith("/")) return baseUrl + url;
      return baseUrl;
    },
  },
});
