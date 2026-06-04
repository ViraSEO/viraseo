import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
  params: {
    scope:
  "openid email profile https://www.googleapis.com/auth/youtube.readonly",
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
  },
},
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
  if (account?.access_token) {
    token.accessToken = account.access_token;
  }

  return token;
},

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}