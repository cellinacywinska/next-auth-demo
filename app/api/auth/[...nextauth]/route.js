import { testDbConnection } from "@/lib/postgres";
import {User} from "@/models/User";
import NextAuth from "next-auth/next";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
      CredentialsProvider({
        name: 'credentials',
        credentials: {},
  
        async authorize(credentials) {
          const { email, password } = credentials;  
          try {
            await  testDbConnection();
            const user = await User.findOne({ email });
  
            if (!user) {
                return null;
              }
    
              const passwordsMatch = await bcrypt.compare(password, user.password);
    
              if (!passwordsMatch) {
                return null;
              }
              return user;
            } catch (error) {
              console.log("Error: ", error);
            }
          },
        }),
      ],
    session: {
      strategy: 'jwt',
    },
    secret: "nynrssnynwasr",
    pages: {
      signIn: '/',
    },
  };

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
