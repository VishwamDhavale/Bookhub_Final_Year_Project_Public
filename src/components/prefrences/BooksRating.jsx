"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import CheckGenre from "@/lib/CheckGenre";
import BookRatingNextPhase from "./BookRatingNextPhase";

const GenreSelector = ({ genres = [] }) => {
  // State to keep track of selected genres
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [nextPhase, setNextPhase] = useState(false);
  const hasFetchedData = useRef(false);
  const session = useSession();
  const userId = session;

  useEffect(() => {
    const checkGenres = async () => {
      try {
        const response = await axios.get("/api/preferences");
        if (response) {
          alert("Genres already selected. Redirecting to dashboard.");
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error checking genres:", error);
        // Handle any errors here, e.g., notify the user or log the error
      }
    };

    if (!hasFetchedData.current) {
      checkGenres();
      hasFetchedData.current = true;
    }
  }, []);

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
      console.log("userId", userId);
      const response = await axios.post(
        "/api/books/selectedgenres",
        selectedGenres
      );

      if (response.status === 200) {
        setShowSuccessMessage(true);
        setNextPhase(true);
        // router.push(`/preferences/booksrating${userId}`);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setShowErrorMessage(true);
    }
  };
  const genreColors = {
    Biography: "bg-yellow-200",
    "Children's": "bg-pink-200",
    Comics: "bg-orange-200",
    Crime: "bg-red-200",
    Fantasy: "bg-purple-200",
    Fiction: "bg-blue-200",
    History: "bg-green-200",
    Horror: "bg-gray-200",
    "Humor and Comedy": "bg-teal-200",
    Mystery: "bg-indigo-200",
    "Non-fiction": "bg-yellow-400",
    Philosophy: "bg-pink-400",
    Poetry: "bg-orange-400",
    Psychology: "bg-red-400",
    Religion: "bg-purple-400",
    Romance: "bg-blue-400",
    Science: "bg-green-400",
    "Science fiction": "bg-gray-400",
    "Self help": "bg-teal-400",
    Thriller: "bg-indigo-400",
    Travel: "bg-yellow-600",
  };

  return (
    <>
      <div>
        {nextPhase ? (
          <BookRatingNextPhase genres={selectedGenres} user={userId} />
        ) : (
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">
              Select your favorite genres
            </h1>
            <p className="text-gray-600 mb-8">
              We use your favorite genres to make better book recommendations
              and tailor what you see in your Updates feed.
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.isArray(genres) &&
                genres.map((genre) => {
                  const isSelected = selectedGenres.some(
                    (g) => g.id === genre.id
                  );
                  return (
                    <div
                      key={genre.id}
                      className={`flex items-center justify-center p-4 rounded-md cursor-pointer transition-transform transform ${
                        isSelected
                          ? "scale-105 bg-blue-500 text-white border-4 border-black shadow-lg"
                          : "text-gray-800 border-2 border-gray-300"
                      } ${genreColors[genre.name] || "bg-gray-300"}`}
                      onClick={() => toggleGenre(genre)}
                      style={{ height: "100px" }}
                    >
                      <input
                        id={genre.name.toLowerCase().replace(/\s+/g, "-")}
                        type="checkbox"
                        className="hidden"
                        checked={isSelected}
                        onChange={() => toggleGenre(genre)}
                        disabled={
                          selectedGenres.length >= 10 &&
                          !selectedGenres.some((g) => g.id === genre.id)
                        }
                      />
                      <label
                        htmlFor={genre.name.toLowerCase().replace(/\s+/g, "-")}
                        className={`text-sm cursor-pointer ${
                          isSelected ? "text-white" : "text-black"
                        }`}
                      >
                        {genre.name}
                      </label>
                    </div>
                  );
                })}
            </div>
            <p className="text-gray-600 mb-4">
              Don't see your favorite genres here?
            </p>
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
        )}
      </div>
    </>
  );
};

export default GenreSelector;
