import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
// import { useLoginUser } from "providers/Auth";
import { getUser, login } from "services/auth";

export default NextAuth({
  secret: "INp6HjGDyOpYnGAEdLoQSDDPKAlwLEdnDcCkFvA8QSPR",
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        Email: {
          label: "Email",
          type: "text",
          placeholder: "johndoe@test.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          const resp = await login({
            Email: credentials.Email,
            password: credentials.password,
          });
          return Promise.resolve(
            resp?.token ? { jwtToken: resp?.token } : {},
          ) as any;
        } catch (e: any) {
          return Promise.reject(new Error(e?.msg || "Something Wrong"));
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    async signIn({ user }: any) {
      if (user?.jwtToken) {
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    },
    async session({ session, token }: any) {
      if (!token.accessToken) {
        return Promise.resolve(session);
      }

      session.accessToken = token.accessToken;
      session.user = token.user as any;
      // session.user = await getUser(token.accessToken as string);
      return Promise.resolve(session);
    },
    async jwt({ token, user }: any) {
      if (user?.jwtToken) {
        // eslint-disable-next-line
        token = {
          accessToken: user.jwtToken,
        };
      }

      if (token.accessToken && !token.user) {
        token.user = await getUser(token.accessToken as string);
      }
      return Promise.resolve(token);
    },
  },
});
