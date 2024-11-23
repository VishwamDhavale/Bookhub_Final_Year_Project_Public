import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.redirect("/auth/signin");
    }

    const deleteAllRecommdBook = await db.RecommendedBook.deleteMany({
        where: {
            userId: session?.user.id
        }
    });

    if (deleteAllRecommdBook.count === 0) {
        return NextResponse.json(false, { message: "No books found" }, { status: 404 });
    }

    return NextResponse.json(true, { message: "Books deleted successfully" }, { status: 200 });
}