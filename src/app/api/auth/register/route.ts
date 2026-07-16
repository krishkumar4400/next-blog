import connectToDB from "@/lib/database";
import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { genSalt, hash } from "bcrypt-ts";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';


export async function POST(request: NextRequest) {
    try {
        await connectToDB();
        const cookieStore = await cookies();

        const { name, email, password } = await request.json();

        let user = await userModel.findOne({ email });


        if (user) {
            return NextResponse.json({
                message: "User already exists with this email address",
                success: false
            }, {
                status: 409
            });
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);


        user = await userModel.create({
            name,
            email,
            password: hashedPassword
        });

        const JWT_SECRET = process.env.JWT_SECRET as string;

        if (!JWT_SECRET) {
            throw new Error("JWT TOKEN is Missing in the environment file");
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: '1d'
        });
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'strict'
        });

        return NextResponse.json({
            message: "User registered successfully",
            success: true
        }, {
            status: 201
        });

    } catch (error) {

    }
}