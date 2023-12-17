import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../model/User";
import bcrypt from "bcrypt";
import db from "../../../../utils/db";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        await db.connectDb();
        const password = credentials.password;
        const phoneNumber = credentials.phoneNumber;

        try {
          const user = await User.findOne({ phoneNumber });

          if (user) {
            return SignInUser({ password, user });
          } else {
            throw new Error("This phone does not exist");
          }
        } catch (err) {
          console.error("Error in authorize:", err);
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      let user = await User.findById(token.sub);
      session.user.id = token.sub || user._id.toString();
      session.user.role = user.role || "user";
      token.role = user.role || "user";
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

const SignInUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error("Please Enter your Password");
  }
  const textPassword = await bcrypt.compare(password, user.password);

  if (!textPassword) {
    throw new Error("Wrong Password");
  }
  return user;
};
