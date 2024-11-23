"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect } from "react";

export default function DisplayDashboardBooks({ user }) {
  const [likedBooks, setLikedBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/books/getLikedBooks`);
        console.log(response.data);
        setLoading(false);
        setLikedBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="overflow-scroll no-scrollbar">
      <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4 ">
        {/* {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="relative aspect-[16/9]  w-auto rounded-md md:aspect-auto md:h-[400px]"
          >
            <img
              src="https://images.unsplash.com/photo-1588099768531-a72d4a198538?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NnwxMTM4MTU1NXx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
              alt="AirMax Pro"
              className="z-0 h-full w-full rounded-md object-cover"
            />
            <div className="absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-left">
              <h1 className="text-lg font-semibold text-white">Nike Airmax v2</h1>
              <p className="mt-2 text-sm text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi, debitis?
              </p>
              <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
                Shop Now &rarr;
              </button>
            </div>
          </div>
        ))} */}
        {!loading ? (
          likedBooks.slice(0, 4).map((book, index) => (
            <div
              key={index}
              className="relative aspect-[16/9]  w-auto rounded-md md:aspect-auto md:h-[400px]"
            >
              <img
                src={book.cover_image}
                alt="AirMax Pro"
                className="z-0 h-full w-full rounded-md object-cover"
              />
              <div className="absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-left">
                <h1 className="text-lg font-semibold text-white">
                  {book.title}
                </h1>
                <p className="mt-2 text-sm text-gray-300">
                  Rating : {book.rating}
                </p>
                <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
                  Shop Now &rarr;
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-row w-full h-10 justify-center items-center">
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
        )}
      </div>
    </div>
  );
}
