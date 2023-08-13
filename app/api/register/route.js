import { NextResponse } from "next/server";
import { testDbConnection } from "@/lib/postgres";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";


export async function POST(req) {
    try {
        const { email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        await testDbConnection();
        await User.create({ email, password: hashedPassword});

        return NextResponse.json({ message: "User registered" },
            { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "An error occured while registering the user." },
            { status: 500 }
        );
    }
} 