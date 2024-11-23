import axios from 'axios';
import { NextResponse } from 'next/server';
import { listofbooks } from "@/lib/listofbooks"

export async function POST(req) {
    try {
        const { title } = await req.json();
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOK_API;

        if (!title) {
            return NextResponse.json({ error: 'Book title is required' }, { status: 400 });
        }

        if (!apiKey) {
            console.error('Google Books API key is not set');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        // Search for the book by title
        const searchResponse = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}&key=${apiKey}`);

        if (!searchResponse.ok) {
            throw new Error(`Failed to fetch the book. Status: ${searchResponse.status}`);
        }

        const searchResult = await searchResponse.json();

        if (!searchResult.items || searchResult.items.length === 0) {
            return NextResponse.json({ error: 'No books found with this title' }, { status: 404 });
        }

        const book = searchResult.items[0];
        const category = book.volumeInfo.categories?.[0] || '';
        const author = book.volumeInfo.authors?.[0] || '';

        // Post data to another API to get similar books
        // const similarBooksResponse = await axios.post('/api/similar-books/listofbooks', {
        //     book, author, category
        // });

        const similarBooksResponse = await listofbooks(book, author, category);

        const similarBooksResult = similarBooksResponse;

        if (!similarBooksResult.items) {
            return NextResponse.json({ error: 'No similar books found' }, { status: 404 });
        }

        const similarBooks = similarBooksResult.items.filter(item => item.id !== book.id);

        return NextResponse.json(similarBooks);
    } catch (error) {
        console.error('Error fetching similar books:', error.message);
        return NextResponse.json({ error: 'Failed to fetch similar books', details: error.message }, { status: 500 });
    }
}

export async function OPTIONS(req) {
    return NextResponse.json({}, { status: 200 });
}
