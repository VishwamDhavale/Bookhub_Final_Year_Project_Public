import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const genres = body.data;

        // Transform the array of strings into an array of objects
        const genreData = genres.map((genre) => ({ name: genre }));
        console.log("Transformed data:", genreData);

        // Insert genres into the database
        const response = await db.Genre.createMany({
            data: genreData,
            skipDuplicates: true, // Optional: to avoid duplicate entries
        });

        return NextResponse.json({ message: "Genres inserted successfully", response }, { status: 200 });
    } catch (error) {
        console.error("Error inserting genres:", error);
        return NextResponse.json({ message: "Error inserting genres", error }, { status: 500 });
    }
}
