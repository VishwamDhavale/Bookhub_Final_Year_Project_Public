import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    function bigIntToString(obj) {
        return JSON.parse(JSON.stringify(obj, (key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value
        ));
    }

    try {
        const booksWithRecommendations = await db.AllBooks.findMany({
            where: {
                recommendedBooks: {
                    some: {
                        userId: session.user.id
                    }
                }
            },
            select: {
                book_id: true,
                title: true,
                ratings: true,
                url: true,
                cover_image: true,
                mod_title: true,
                recommendedBooks: {
                    where: {
                        userId: session.user.id
                    },
                    select: {
                        id: true,
                        userId: true,
                        book_id: true,
                    }
                }
            }
        });

        if (booksWithRecommendations.length > 0) {
            const serializedBooks = bigIntToString(booksWithRecommendations);
            return NextResponse.json(serializedBooks, { status: 200 });
        }

        return NextResponse.json({ message: "No recommended books found" });
    }
    catch (error) {
        console.error("Error fetching books:", error);
        return NextResponse.json({ message: "Error fetching books" }, { status: 500 });
    }
}