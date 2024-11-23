import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { ratings } = await req.json(); // Payload from the frontend
        console.log("Ratings:", ratings);
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;

        if (!session) {
            return NextResponse.redirect("/api/auth/signin");
        }

        // const checkUserBook = await db.UserBook.findFirst({
        //     where: {
        //         userId: userId,
        //         bookId: ratings.book_id
        //     }
        // });


        const checkUserBook = await db.UserBook.findFirst({
            where: {
                userId: userId,
                bookId: ratings.book_id
            }
        });


        if (!checkUserBook) {
            const response = await db.UserBook.create({
                data: {
                    userId,
                    bookId: ratings.book_id,
                    rating: ratings.rating,
                    url: ratings.url,
                    title: ratings.title,
                    cover_image: ratings.cover_image,
                }
            });
            if (!response) {
                return NextResponse.json({ message: "Error saving ratings" }, { status: 500 });
            }
            return NextResponse.json({ message: "Ratings saved successfully" }, { status: 200 });
        }

        // Create the array of rating entries including all required fields
        return NextResponse.json({ oldratings: checkUserBook.rating }, { message: "Ratings already saved" }, { status: 200 });
    } catch (error) {
        console.error("Error saving ratings:", error);
        return NextResponse.json({ message: "Error saving ratings", error: error.message }, { status: 500 });
    }
}
