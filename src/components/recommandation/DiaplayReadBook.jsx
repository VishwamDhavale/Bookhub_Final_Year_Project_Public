/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Zngy5ATWCot
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { Rating } from "@mui/material";
import Link from "next/link";

export default function DisplayReadBook({ readbooks }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">All Books</h1>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {readbooks.map((book) => (
          <Link
            key={book.note_id}
            href="#"
            className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            prefetch={false}
          >
            <img
              src="/image.jpg"
              alt={book.title}
              width={400}
              height={600}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                Book Title
              </p>
              <h2 className="text-lg font-bold mb-2">{book.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
