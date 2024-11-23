"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";

const BookRatingNextPhase = ({ genres = [], user }) => {
  const [books, setBooks] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasFetchedData = useRef(false);

  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.post("/api/books/getBooks", genres);
        const booksData = response.data;
        setBooks(booksData);
        setRatings(
          booksData.reduce((acc, book) => {
            acc[book.book_id] = 0; // Default rating value
            return acc;
          }, {})
        );
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (!hasFetchedData.current) {
      fetchBooks();
      hasFetchedData.current = true;
    }
  }, [genres]);

  const handleRatingChange = (bookId, newValue) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [bookId]: newValue,
    }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);

      // Filter out books with a rating of 0
      const ratedBooks = Object.entries(ratings).filter(
        ([bookId, rating]) => rating !== 0
      );

      // Log the ratedBooks to see what is being processed
      console.log("Rated Books:", ratedBooks);

      // Log the books array to debug
      console.log("Books Array:", books);

      // Construct the payload for the rated books including additional fields
      const ratedBooksPayload = ratedBooks
        .map(([bookId, rating]) => {
          // Convert bookId to string for consistent comparison
          const bookIdStr = String(bookId);

          // Find the book details by matching bookId
          const bookDetails = books.find(
            (book) => String(book.book_id) === bookIdStr
          );

          // Log the bookDetails to debug
          console.log("Book Details:", bookDetails);

          if (!bookDetails) {
            console.error(`No book found with book_id: ${bookIdStr}`);
            return null; // Skip this entry if bookDetails are not found
          }

          return {
            rating: rating,
            book_Id: parseInt(bookIdStr, 10), // Ensure book_Id is a BigInt
            userId: user.id, // Assuming user object is available
            readDate: new Date().toISOString(), // Set the readDate to the current date and time
          };
        })
        .filter((payload) => payload !== null); // Remove any null entries

      // Log the final payload to debug
      console.log("Rated Books Payload:", ratedBooksPayload);

      const response = await axios.post("/api/books/saveRatings", {
        ratings: ratedBooksPayload,
      });

      if (response.status === 200) {
        console.log("Submitted ratings:", ratedBooksPayload);
        router.push("/dashboard");
        // Optionally, add more logic here, such as navigating to a different page or showing a success message
      }
    } catch (error) {
      console.error("Error submitting ratings:", error);
      setError(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const truncateTitle = (title) => {
    return title.length > 20 ? title.slice(0, 20) + "..." : title;
  };

  return (
    <div style={{ padding: "16px" }}>
      <div
        style={{
          backgroundColor: "rgba(255, 0, 0, 0.1)",
          padding: "5px",
          borderRadius: "5px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <h6>
          <strong>Rate Books that You've Read</strong>
        </h6>
        <p>
          Goodreads learns about your personal tastes from your ratings.
          <br />
          <b>Rate 5 more books</b> to get personalized recommendations!
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "60px" }}>
        {books.map((book) => (
          <div
            key={book.book_id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "160px",
            }}
          >
            <img
              src={book.cover_image}
              alt={book.title}
              style={{
                height: "240px",
                width: "160px",
                objectFit: "cover",
                marginBottom: "8px",
              }}
            />
            <p style={{ fontSize: "16px", textAlign: "center", margin: "0" }}>
              {truncateTitle(book.title)}
            </p>
            <h6>
              <strong>Rate it:</strong>
            </h6>
            <Rating
              name={`rating-${book.book_id}`}
              value={ratings[book.book_id]}
              onChange={(event, newValue) =>
                handleRatingChange(book.book_id, newValue)
              }
              precision={1}
            />
          </div>
        ))}
      </div>

      {submitLoading ? (
        <div>Submitting ratings...</div>
      ) : (
        <button
          onClick={handleSubmit}
          style={{
            marginTop: "20px",
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          I'm finished rating
        </button>
      )}

      {submitLoading && <div className="loader"></div>}
    </div>
  );
};

export default BookRatingNextPhase;
