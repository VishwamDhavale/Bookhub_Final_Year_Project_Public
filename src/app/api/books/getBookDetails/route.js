import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Helper function to convert BigInt to string
function bigIntToString(obj) {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value
    ));
}

export async function POST(req) {
    const body = await req.json();
    const id = body; // Adjusted to extract 'id' property from the body

    console.log("Book ID at server:", id);
    const bookId = BigInt(id);
    console.log("Book ID after BigInt conversion:", bookId.toString());

    try {
        const bookDetails = await db.AllBooks.findUnique({
            where: {
                book_id: bookId,
            },
            select: {
                book_id: true,
                title: true,
                url: true,
                ratings: false,
                cover_image: true,
                mod_title: true,
                userHistories: {
                    select: {
                        rating: true,
                    },
                },
            },
        });
        console.log("Book Details:", bookDetails);

        if (!bookDetails) {
            return NextResponse.json({ message: "Book details not found" }, { status: 404 });
        }

        // Prepare the response
        const response = {
            book_id: bookDetails.book_id.toString(),
            title: bookDetails.title,
            url: bookDetails.url,
            cover_image: bookDetails.cover_image,
            mod_title: bookDetails.mod_title,
            ratings: bookDetails.userHistories.map(history => history.rating), // Directly return ratings
        };

        // Convert BigInt values to strings
        const serializedResponse = bigIntToString(response);

        return NextResponse.json(
            { data: serializedResponse, message: "Book details fetched successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ message: "Error fetching book details" }, { status: 500 });
    }
}
