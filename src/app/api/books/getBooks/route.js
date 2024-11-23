import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // Parse the request body to get the genres
        const body = await req.json();
        const genres = body;
        // console.log("Genres:", genres);

        // Ensure genres is a non-empty array
        if (!Array.isArray(genres) || genres.length === 0) {
            return NextResponse.json({ message: "Genres must be a non-empty array" }, { status: 400 });
        }

        // Extract genre names from the genres array
        const genreNames = genres.map(genre => genre.name);
        console.log("Genre Names:", genreNames);

        // Get the session to ensure user is authenticated
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.redirect("/api/auth/signin");
        }

        // Query the PopularBook model with the extracted genre names
        const response = await db.PopularBook.findMany({
            where: {
                genre: {
                    in: genreNames, // Filtering books based on genre names
                },
            },
        });

        // Return the books in the response
        return NextResponse.json(response, { status: 200 });

    } catch (error) {
        console.error("Error fetching books:", error);
        return NextResponse.json({ message: "Error fetching books", error: error.message }, { status: 500 });
    }
}
