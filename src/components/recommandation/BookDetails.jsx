"use client";
import React, { useState, useEffect } from "react";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";

const fetchBookDetails = async (title, timeout = 5000) => {
  const controller = new AbortController();
  const signal = controller.signal;

  const fetchTimeout = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`,
      { signal }
    );
    const data = await response.json();
    clearTimeout(fetchTimeout);
    const bookInfo = data.items?.[0]?.volumeInfo || {};
    return {
      author: bookInfo.authors?.[0] || null,
      description: bookInfo.description || null,
    };
  } catch (error) {
    clearTimeout(fetchTimeout);
    return { author: null, description: null };
  }
};

export const BookDetails = ({ book }) => {
  const [ratings, setRatings] = useState({});
  const [author, setAuthor] = useState(null);
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getBookDetails = async () => {
      // console.log("book.title", book.ratings[0]);
      console.log("book.title", book.title);
      const { author, description } = await fetchBookDetails(book.title);
      setAuthor(author);
      setDescription(description);
      setLoading(false);
    };
    getBookDetails();

    if (book.ratings) {
      setRatings({ [book.book_id]: Number(book.ratings[0]) });
    }
  }, [book.title, book.ratings]);

  const handleRatingChange = (bookId, newValue) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [bookId]: newValue,
    }));

    // Send the updated ratings to the server
    const updatedRatings = fetch("/api/books/bookdetailratings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ratings: newValue, book_id: book.book_id }),
    });
    console.log("updatedRatings", updatedRatings);
  };
  const handleReadClick = async () => {
    try {
      const response = await axios.post(`/api/books/booknotes`, {
        title: book.title,
      });

      if (response.data && response.data.note_id) {
        router.push(`/notebooks/${response.data.note_id}`);
      } else {
        console.error("Invalid response data:", response.data);
        // Optionally, show an error message to the user
      }
    } catch (error) {
      console.error("Error creating book note:", error);
      // Optionally, show an error message to the user
    }
  };

  const truncatedDescription =
    description && description.length > 300
      ? description.slice(0, 300) + "..."
      : description;

  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-10xl px-5 py-10">
        <div className="mx-auto flex flex-nowrap items-center lg:w-4/5">
          <img
            alt={book.title}
            src={book.cover_image}
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
            <h1 className="my-4 text-4xl font-semibold text-black">
              {book.title}
            </h1>
            {!loading && author && (
              <h2 className="text-2xl font-medium text-gray-700">{author}</h2>
            )}
            <div className="my-4 flex items-center">
              <h6 className="text-lg">
                <strong>Rate it:</strong>
              </h6>
              <Rating
                name={`rating-${book.book_id}`}
                value={ratings[book.book_id] || 0}
                onChange={(event, newValue) =>
                  handleRatingChange(book.book_id, newValue)
                }
                precision={1}
                size="large"
                style={{ marginLeft: "8px" }}
              />
            </div>
            <p className="leading-relaxed text-lg">
              {loading
                ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta."
                : description
                ? showFullDescription
                  ? description
                  : truncatedDescription +
                    (description.length > 300 ? (
                      <span
                        className="text-blue-600 cursor-pointer"
                        onClick={() =>
                          setShowFullDescription(!showFullDescription)
                        }
                      >
                        {showFullDescription ? " Show less" : " Read more"}
                      </span>
                    ) : (
                      ""
                    ))
                : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta."}
            </p>
            <div className="mt-5 flex space-x-4">
              <button
                type="button"
                className="rounded-lg bg-black px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none"
                onClick={() => handleReadClick(book.title)}
              >
                Read
              </button>
              <button
                type="button"
                className="rounded-lg border-2 border-black px-6 py-3 text-lg font-semibold text-black shadow-sm hover:bg-gray-200 focus:outline-none"
                onClick={() => window.open(book.url, "_blank")}
              >
                More Info
              </button>
              <button
                type="button"
                className="rounded-lg border-2 border-black px-6 py-3 text-lg font-semibold text-black shadow-sm hover:bg-gray-200 focus:outline-none"
                onClick={() =>
                  router.push(
                    `/dashboard/recommandation/reco-navbar/book-corrousal`
                  )
                }
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
