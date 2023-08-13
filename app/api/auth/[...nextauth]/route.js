import { testDbConnection } from "@/lib/postgres";
import { User } from "@/models/User";
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
                console.log(credentials);

                try {
                    await testDbConnection();
                    const user = await User.findOne({ where: { email } });
                    if (!user) {
                        return null;
                    }
                    // here we check type of person user.jobType === 'DOCTOR' 

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
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/',
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
