"use client";

import React from "react";
import { db } from "@/lib/db"; // Ensure this imports the configured Prisma client

const genres = [
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
];

const GenreSelector = () => {
  const insertGenres = async () => {
    try {
      // Insert genres into the database
      const response = await db.genre.createMany({
        data: genres.map((genre) => ({ name: genre })),
        skipDuplicates: true, // Optional: to avoid duplicate entries
      });

      console.log("Genres inserted successfully:", response);
    } catch (error) {
      console.error("Error inserting genres:", error);
    }
  };

  return (
    <div>
      <h1>Genre Selector</h1>
      <ul>
        {genres.map((genre, index) => (
          <li key={index}>{genre}</li>
        ))}
      </ul>
      <button
        onClick={insertGenres}
        className="mt-4 w-full rounded-sm bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black"
      >
        Submit Genres
      </button>
    </div>
  );
};

export default GenreSelector;
