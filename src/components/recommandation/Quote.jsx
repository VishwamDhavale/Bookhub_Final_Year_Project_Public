"use client";
import React, { useState, useEffect } from "react";

const Quote = () => {
  const [quoteData, setQuoteData] = useState(null);
  const defaultQuote = {
    quote: "In traveling, a companion, in life, compassion.",
    author: "Haruki Murakami",
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!quoteData) {
        setQuoteData(defaultQuote);
      }
    }, 5000); // 5 seconds timeout

    fetch("https://recite.onrender.com/random/quote-from-db")
      .then((response) => response.json())
      .then((data) => setQuoteData(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setQuoteData(defaultQuote); // Set default quote on error
      });

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="bg-white w-full h-96 flex flex-col justify-between items-center relative"
      style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
    >
      <div
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{
          backgroundImage: 'url("/quote3.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <h4 className="text-lg font-semibold leading-7 mt-6 mb-5 text-center">
          Featured Quote
        </h4>
        {quoteData && (
          <blockquote className="text-4xl font-medium leading-12 text-center">
            {quoteData.quote.length > 50 ? ( // Adjust the character limit as needed
              <>
                <span>{quoteData.quote.substring(0, 50)}</span>
                <br />
                <span>{quoteData.quote.substring(50)}</span>
              </>
            ) : (
              <span>{quoteData.quote}</span>
            )}
            <br></br>
            <cite className="block mt-4">— {quoteData.author}</cite>
          </blockquote>
        )}
      </div>
    </div>
  );
};

export default Quote;
