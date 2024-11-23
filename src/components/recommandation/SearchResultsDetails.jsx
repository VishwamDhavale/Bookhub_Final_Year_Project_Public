"use client";
import React, { useState, useEffect } from "react";
import { Rating } from "@mui/material";

const SearchResultsDetails = ({ bookId }) => {
  const [ratings, setRatings] = useState({});
  const [authors, setAuthors] = useState("");
  const [description, setDescription] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [buyUrl, setBuyUrl] = useState(null);
  const [title, setTitle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const getBookDetails = async () => {
      try {
        console.log("Sending bookId:", bookId);
        const response = await fetch("/api/books/searchResultsDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }

        const data = await response.json();
        console.log("Received data:", data);

        const { description, buyLink, coverImage, title, authors } = data;

        // Handle single or multiple authors
        const formattedAuthors = Array.isArray(authors)
          ? authors.join(", ")
          : authors || "Unknown Author";

        setAuthors(formattedAuthors);
        setTitle(title);
        setDescription(description);
        setCoverImage(coverImage);
        setBuyUrl(buyLink);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    getBookDetails();
  }, [bookId]);

  const handleRatingChange = (bookId, newValue) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [bookId]: newValue,
    }));

    // TODO: Implement server-side rating update
  };

  const renderDescription = () => {
    if (!authors) {
      return "Authors not available.";
    }
    if (loading) {
      return "Loading...";
    }

    if (!description) {
      return "Description not available.";
    }

    if (showFullDescription || description.length <= 300) {
      return description;
    }

    return (
      <>
        {description.slice(0, 300)}...
        <span
          className="text-blue-600 cursor-pointer"
          onClick={() => setShowFullDescription(!showFullDescription)}
        >
          {showFullDescription ? " Show less" : " Read more"}
        </span>
      </>
    );
  };

  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-10xl px-5 py-10">
        <div className="mx-auto flex flex-nowrap items-center lg:w-4/5">
          <img
            alt={title}
            src={coverImage}
            style={{
              height: "320px",
              width: "200px",
              objectFit: "cover",
              marginBottom: "16px",
              boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
              borderTopRightRadius: "15px",
              borderBottomRightRadius: "15px",
            }}
          />
          <div className="mt-6 w-full lg:mt-0 lg:w-10/12 lg:pl-10">
            <h1 className="my-4 text-4xl font-semibold text-black">{title}</h1>
            <h2 className="text-2xl font-medium text-gray-700">{authors}</h2>
            <div className="my-4 flex items-center">
              <h6 className="text-lg">
                <strong>Rate it:</strong>
              </h6>
              <Rating
                name={`rating-${bookId}`}
                value={ratings[bookId] || 0}
                onChange={(event, newValue) =>
                  handleRatingChange(bookId, newValue)
                }
                precision={1}
                size="large"
                style={{ marginLeft: "8px" }}
              />
            </div>
            <p className="leading-relaxed text-lg">{renderDescription()}</p>
            <div className="mt-5 flex space-x-4">
              <button
                type="button"
                className="rounded-lg bg-black px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none"
              >
                Read
              </button>
              <button
                type="button"
                className="rounded-lg border-2 border-black px-6 py-3 text-lg font-semibold text-black shadow-sm hover:bg-gray-200 focus:outline-none"
                onClick={() => window.open(buyUrl, "_blank")}
              >
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchResultsDetails;
