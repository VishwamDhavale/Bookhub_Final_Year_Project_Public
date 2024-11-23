"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";

let testdata = null;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetchedData = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let productsData = null;

        // Fetch data from your backend API
        const response = await axios.get("/api/books/getrecommdbook");

        if (response.status === 200 && response.data.length > 0) {
          // Data found in the database, set products and exit
          console.log("Data found in the database:", response.data);
          productsData = response.data;
          setProducts(productsData);
          setLoading(false);
          return;
        }

        const response1 = await axios.get("/api/books/getLikedBooks");

        if (response1.status === 200) {
          testdata = response1.data;
        }
        console.log("response1.data", response1.data);
        const mondelUrl = process.env.NEXT_PUBLIC_COLLABORATIVEFILTERING_URL;
        console.log("mondelUrl", mondelUrl);

        // If no data found in the database, fetch from the FastAPI endpoint
        const response2 = await axios.post(mondelUrl, {
          liked_books: testdata,
        });
        console.log("Data fetched from FastAPI:", response2.data);
        productsData = response2.data;

        // Insert the fetched data into the database
        await axios.post("/api/books/updaterecommdbook", productsData);
        // recommendations: JSON.stringify(productsData),

        const bookdata = JSON.parse(response2.data.recommendations);
        productsData = bookdata;
        console.log("Data inserted into the database respinse 3:", bookdata);

        // Set products and loading state
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };

    // Only fetch data if it hasn't been fetched yet
    if (!hasFetchedData.current) {
      fetchData();
      hasFetchedData.current = true;
    }
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="dot-spinner">
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
        </div>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  if (!Array.isArray(products)) {
    console.log("Products is not an array:", typeof products); // Log the products variable
    return <div>Error: Products data format is invalid</div>;
  }

  return (
    <>
      <div className="container mx-auto grid w-full max-h-screen max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4 overflow-auto ">
        {products.map((product, index) => (
          <div key={index} className="product-card rounded-md border shadow-sm">
            <div className="relative w-full h-[360px]">
              <img
                src={product.cover_image}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover "
                style={{ height: "360px", width: "240px" }}
              />
            </div>
            <div className="p-4">
              <h1
                className="product-title text-lg font-semibold truncate"
                title={product.title}
              >
                {product.title}
              </h1>
              <Link
                href={`/dashboard/recommandation/reco-navbar/book_detail/${product.book_id}`}
                key={product.title}
              >
                <button
                  type="button"
                  className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  Read
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

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
};

export default ProductList;
