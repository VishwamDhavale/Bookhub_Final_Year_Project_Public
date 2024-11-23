import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    const genres = ([
        "Art",
        "Biography",
        "Business",
        "Chick Lit",
        "Children's",
        "Christian",
        "Classics",
        "Comics",
        "Contemporary",
        "Cookbooks",
        "Crime",
        "Ebooks",
        "Fantasy",
        "Fiction",
        "Gay and Lesbian",
        "Graphic Novels",
        "Historical Fiction",
        "History",
        "Horror",
        "Humor and Comedy",
        "Manga",
        "Memoir",
        "Music",
        "Mystery",
        "Nonfiction",
        "Paranormal",
        "Philosophy",
        "Poetry",
        "Psychology",
        "Religion",
        "Romance",
        "Science",
        "Science Fiction",
        "Self Help",
        "Suspense",
        "Spirituality",
        "Sports",
        "Thriller",
        "Travel",
        "Young Adult",
    ]);
    try {
        for (const genre of genres) {
            await db.Genre.create({ data: { name: genre } });
        }
        console.log("Genres inserted successfully!");
        return NextResponse.json({ message: "Genres inserted successfully!" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 400 });

    }

}