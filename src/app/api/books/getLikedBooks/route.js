import { authOptions } from "@/lib/auth";
import { bigIntToString } from "@/lib/bigIntToString";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.redirect("/api/auth/signin");
    }

    const userId = session.user.id;

    try {
        const likedBooks = await db.UserHistory.findMany({
            where: {
                userId: userId,
            },
            include: {
                books: true, // Include related AllBooks data
            },
        });

        if (!likedBooks || likedBooks.length === 0) {
            return NextResponse.json({ message: "No liked books found" }, { status: 404 });
        }

        // Extract the book details along with the rating from UserHistory
        const likedBooksDetails = likedBooks.map((userHistory) => ({
            bookId: userHistory.book_Id,
            rating: userHistory.rating,
            readDate: userHistory.readDate,
            title: userHistory.books.title || 'Unknown Title',
            url: userHistory.books.url || 'Unknown URL',
            cover_image: userHistory.books.cover_image || 'Unknown Cover Image',
        }));

        console.log(likedBooksDetails);

        // Transform and serialize the book details
        const transformedBooks = likedBooksDetails.map(book => ({
            user_id: userId,
            book_id: book.bookId,
            rating: book.rating,
            title: book.title,
            url: book.url,
            cover_image: book.cover_image,
            read_date: book.readDate.toISOString(),
        }));

        const serializedBooks = bigIntToString(transformedBooks);
        console.log("serializedBooks", serializedBooks);
        return NextResponse.json(serializedBooks, { status: 200 });

    } catch (error) {
        console.error("Error fetching liked books:", error);
        return NextResponse.json({ message: "Error fetching liked books", error: error.message }, { status: 500 });
    }
}
