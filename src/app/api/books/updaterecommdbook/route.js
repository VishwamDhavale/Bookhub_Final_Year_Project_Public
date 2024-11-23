import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { recommendations } = body;

    const booksArray = JSON.parse(recommendations);

    const books = booksArray.map(({ book_id }) => ({
        book_id: BigInt(book_id),
        userId: session?.user.id
    }));

    console.log("Books:", books);

    try {
        // Check which book_ids are already in AllBooks table
        const existingBooks = await db.allBooks.findMany({
            where: {
                book_id: {
                    in: books.map(book => book.book_id)
                }
            },
            select: {
                book_id: true
            }
        });

        const existingBookIdSet = new Set(existingBooks.map(book => book.book_id));

        // Filter out books that need to be added to AllBooks
        const booksToAdd = books.filter(book => !existingBookIdSet.has(book.book_id));

        // Insert missing books into AllBooks table
        if (booksToAdd.length > 0) {
            await db.allBooks.createMany({
                data: booksToAdd.map(book => ({ book_id: book.book_id })),
                skipDuplicates: true
            });
        }

        // Now insert all books into RecommendedBook table
        const createdBooks = await db.recommendedBook.createMany({
            data: books,
            skipDuplicates: true
        });

        console.log("Books inserted:", createdBooks);

        // Return success response
        return NextResponse.json({ message: "Books inserted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error inserting books:", error);
        // Return error response
        return NextResponse.json({ message: "Error inserting books" }, { status: 500 });
    }
}