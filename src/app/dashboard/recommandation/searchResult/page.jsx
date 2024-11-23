"use client";
import React, { useState } from "react";
import SearchBar from "@/components/recommandation/SearchBar";
import SearchResults from "@/components/recommandation/SearchResults";

export default function Page() {
  const [similarBooks, setSimilarBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <>
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <a href="#" className="text-xl font-semibold text-gray-800">
                Similar Books Search
              </a>
            </div>
            <div className="inline-flex items-center px-2">
              <a
                href="/dashboard/recommandation"
                className="bg-[#EF7474] hover:bg-red-500 text-white font-semibold text-base py-1.5 px-3 rounded-lg inline-flex items-center"
              >
                Back
              </a>
            </div>
          </nav>
        </div>
      </header>

      <div
        className="bg-white w-full h-96 flex flex-col justify-between items-center relative"
        style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full z-0"
          style={{
            backgroundImage: 'url("/search_bg3.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="z-10 w-full h-full flex flex-col justify-between items-center">
          <h1 className="mt-10 text-3xl font-semibold text-black">
            Find Similar Books to Your Favorites!
          </h1>
          <div className="flex justify-center items-end pb-16">
            <SearchBar
              setSimilarBooks={setSimilarBooks}
              setIsLoading={setIsLoading}
              setError={setError}
            />
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-4">Loading similar books...</div>
      )}
      {error && (
        <div className="text-center py-4 text-red-500">Error: {error}</div>
      )}
      {!isLoading && !error && <SearchResults books={similarBooks} />}

      <style jsx>{`
        .container {
          padding: 0 2rem;
        }
        .product-card {
          transition: transform 0.2s;
        }
        .product-card:hover {
          transform: translateY(-5px);
        }
        .product-title {
          margin-bottom: 0.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}</style>
    </>
  );
}
