import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function listofbooks(book, author, category) {
    try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOK_API;

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.redirect("/api/auth/signin");
        }

        // const { book, author, category } = request.query;

        if (!book || !author || !category) {
            return null
        }

        const similarBooksResponse = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(category)}+inauthor:${encodeURIComponent(author)}&maxResults=10&key=${apiKey}`);

        if (!similarBooksResponse.ok) {
            throw new Error(`Failed to fetch similar books. Status: ${similarBooksResponse.status}`);
        }

        const similarBooksResult = await similarBooksResponse.json();

        // return NextResponse.json(similarBooksResult.items);

        return similarBooksResult
    } catch (error) {
        console.error('Error fetching similar books:', error.message);

    }
}
