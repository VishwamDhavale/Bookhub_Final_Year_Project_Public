// pages/api/book/[id].js

import { authOptions } from '@/lib/auth';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

function stripHTMLTags(str) {
    if (!str) return '';
    return str.replace(/<\/?[^>]+(>|$)/g, '');
}

export async function POST(req, res) {
    const body = await req.json();
    const { bookId } = body;

    console.log("bookId at server", bookId);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOK_API; // Store your API key in .env.local

    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.redirect("/api/auth/signin");
    }
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`);
        const book = response.data;
        const description = stripHTMLTags(book.volumeInfo.description);

        const bookDetails = {
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author',
            description: description || 'No description available',
            coverImage: book.volumeInfo.imageLinks?.thumbnail || null,
            buyLink: book.saleInfo.buyLink || null
        };

        return NextResponse.json(bookDetails);
    } catch (error) {
        console.error('Error fetching book details:', error);
        return NextResponse.json({ error: 'Failed to fetch book details' });
    }
}
