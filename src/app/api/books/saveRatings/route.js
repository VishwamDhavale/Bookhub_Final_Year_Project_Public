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

        // Validate the ratings data
        if (!Array.isArray(ratings) || ratings.length === 0) {
            return NextResponse.json({ message: "No ratings provided" }, { status: 400 });
        }

        // Create the array of rating entries including all required fields
        const ratingEntries = ratings.map(rating => ({
            userId,
            book_Id: BigInt(rating.book_Id), // Ensure book_Id is a BigInt
            rating: rating.rating,
            // Optional fields, you can remove these if they are not part of the UserHistory model
            // url: rating.url,
            // title: rating.title,
            // author: rating.author,
            // cover_image: rating.cover_image,
            readDate: new Date(), // Set the readDate to the current date and time
        }));

        const response = await db.UserHistory.createMany({
            data: ratingEntries
        });

        if (!response) {
            return NextResponse.json({ message: "Error saving ratings" }, { status: 500 });
        }
        return NextResponse.json({ message: "Ratings saved successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error saving ratings:", error);
        return NextResponse.json({ message: "Error saving ratings", error: error.message }, { status: 500 });
    }
}
