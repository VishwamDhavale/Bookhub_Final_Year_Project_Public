"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const GenreSelector = ({ genres = [] }) => {
  // State to keep track of selected genres
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const session = useSession();
  const userId = session?.user?.id;
  const router = useRouter();

  // Toggle selected genres
  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g.name !== genre.name));
    } else {
      if (selectedGenres.length < 10) {
        setSelectedGenres([...selectedGenres, genre]);
      }
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "/api/books/selectedgenres",
        selectedGenres
      );
      if (response.status === 200) {
        setShowSuccessMessage(true);
        router.push("/preferences/booksrating");
      }
      console.log("User updated:", response.data);
    } catch (error) {
      console.error("Error updating user:", error);
      setShowErrorMessage(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Select your favorite genres</h1>
      <p className="text-gray-600 mb-8">
        We use your favorite genres to make better book recommendations and
        tailor what you see in your Updates feed.
      </p>
      {showSuccessMessage && (
        <div className="bg-green-500 text-white p-4 rounded-md mb-4">
          Genres saved successfully!
        </div>
      )}
      {showErrorMessage && (
        <div className="bg-red-500 text-white p-4 rounded-md mb-4">
          Error saving genres. Please try again.
        </div>
      )}
      <div className="grid grid-cols-4 gap-4">
        {Array.isArray(genres) &&
          genres.map((genre) => (
            <div key={genre.id} className="flex items-center">
              <input
                id={genre.name.toLowerCase().replace(/\s+/g, "-")}
                type="checkbox"
                className="w-5 h-5 accent-black"
                checked={selectedGenres.some((g) => g.id === genre.id)}
                onChange={() => toggleGenre(genre)}
                disabled={
                  selectedGenres.length >= 10 &&
                  !selectedGenres.some((g) => g.id === genre.id)
                }
              />
              <label
                htmlFor={genre.name.toLowerCase().replace(/\s+/g, "-")}
                className="ml-2 text-sm"
              >
                {genre.name}
              </label>
            </div>
          ))}
      </div>
      <p className="text-gray-600 mb-4">Don't see your favorite genres here?</p>
      <button
        className={`bg-black text-white py-2 px-4 rounded-md shadow hover:bg-gray-700 ${
          selectedGenres.length < 5 ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={selectedGenres.length < 5}
        onClick={handleSave}
      >
        Select at least 5 genres to continue
      </button>
    </div>
  );
};

export default GenreSelector;
