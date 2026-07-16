import connectToDB from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {
    try {
        await connectToDB();

        const {name, email, password} = await request.json();

        console.log({name, email, password});

    } catch (error) {
        
    }
}