import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    try {
        const check = await db.UserGenre.findFirst({
            where: {
                userId: session.user.id,
            },
        });

        if (check.length > 0) {
            return NextResponse.json(true, { status: 200 });
        } else {
            return NextResponse.json(false, { status: 202 });
        }
    } catch (error) {
        console.error("Error at check genre:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
