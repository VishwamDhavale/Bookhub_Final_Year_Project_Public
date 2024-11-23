"use client";
import React, { useState } from "react";
import ProductList from "./book-corrousal/page";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Reconavbar = () => {
  const [reloadKey, setReloadKey] = useState(0); // Initialize reload key

  const handleRecommendAgain = async () => {
    try {
      const res = await axios.get("/api/books/deleteallrecommdbook");

      if (res.status === 200) {
        // alert("Recommendation Cleared");
        setReloadKey((prevKey) => prevKey + 1); // Update reload key to trigger reload
      } else {
        // alert("Recommendation not Cleared");
        console.error("Recommendation not Cleared");
      }
    } catch (error) {
      console.error("Error clearing recommendation:", error);
      alert("An error occurred while clearing recommendation");
    }
  };

  return (
    <>
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <a href="#" className="text-xl font-semibold text-gray-800">
                Results
              </a>
            </div>
            <div className="inline-flex items-center px-2">
              <Button
                onClick={handleRecommendAgain}
                className="bg-[#F15C5C] hover:bg-red-500 text-white font-semibold text-base py-1.5 px-3 rounded-lg inline-flex items-center mr-4"
              >
                Recommend Again
              </Button>
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

      {/* Use key to force ProductList component to reload */}
      <ProductList key={reloadKey} />
    </>
  );
};

export default Reconavbar;
