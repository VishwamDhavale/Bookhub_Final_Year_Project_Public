"use client";
import Link from "next/link";
import React from "react";

const SearchResults = ({ books }) => {
  if (books.length === 0) {
    return <div className="text-center py-4">No similar books found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {books.map((book) => (
        <Link href={`/dashboard/recommandation/searchResult/${book.id}`}>
          <div className="bg-white rounded-lg shadow-md p-4 product-card">
            <img
              src={
                book.volumeInfo.imageLinks?.thumbnail || "/placeholder-book.jpg"
              }
              alt={book.volumeInfo.title}
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold product-title">
              {book.volumeInfo.title}
            </h3>
            <p className="text-sm text-gray-600">
              by {book.volumeInfo.authors?.[0] || "Unknown Author"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
