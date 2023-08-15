import { testDbConnection } from "@/lib/postgres";
import { User } from "@/models/User";
import { Patient } from "@/models/Patient";
import { Dietitian } from "@/models/Dietitian";
import NextAuth from "next-auth/next";
import bcrypt from "bcryptjs";
import '@/models/associations.js';
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
                    const user = await User.findOne({
                        where: { email },
                        include: [
                            {
                                model: Dietitian,
                                required: false,
                            },
                            {
                                model: Patient,
                                required: false,
                            },
                        ],
                    });
                    // console.log("HALO")
                    // console.log("This is the user: ", user);
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
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            session.user = token.user;
            session.user.password = undefined;
            return session
        }
    },
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
