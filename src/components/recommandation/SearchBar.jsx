"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";

const Searchbar = ({ setSimilarBooks, setIsLoading, setError }) => {
  const [bookTitle, setBookTitle] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (bookTitle.trim() === "") {
      setSimilarBooks([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/similar-books", {
        title: bookTitle,
      });
      setSimilarBooks(response.data);
    } catch (error) {
      console.error("Error fetching similar books", error);
      setError("Failed to fetch similar books. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="w-[500px] relative shadow-lg" onSubmit={handleSearch}>
      <div className="relative">
        <input
          type="search"
          placeholder="Enter a book title to find similar books"
          className="w-full p-4 rounded-full bg-white outline-none"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-[#F15C5C] rounded-full"
        >
          <Search />
        </button>
      </div>
    </form>
  );
};

export default Searchbar;
