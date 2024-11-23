import React from "react";

import Link from "next/link";
import Footer from "@/components/recommandation/Footer";
import RecoButton from "@/components/recommandation/RecoButton";
import Quote from "@/components/recommandation/Quote";
import SearchButton from "@/components/recommandation/SearchButton";

export default function page() {
  return (
    <>
      {/* <Reconavbar></Reconavbar>  */}
      <div className="container  overflow-y-auto no-scrollbar">
        <div
          className="bg-white w-full h-96 flex flex-col justify-between items-center relative"
          style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
        >
          <div
            className="absolute top-0 left-0 w-full h-full z-0"
            style={{
              backgroundImage: 'url("/search_bg2.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="z-10 w-full h-full flex flex-col justify-between items-center">
            <h1 className="mt-10 text-3xl font-semibold text-white">
              Explore Your Next Favorite Reads!
            </h1>
            <div className="flex justify-center items-end pb-10">
              <SearchButton></SearchButton>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-8 bg-gradient-to-r from-[#FCB1B1] to-[#FCFCFC]">
          <div className="max-w-lg items-center">
            <h1 className="text-4xl font-bold mb-4">
              Discover books you'll love!
            </h1>
            <p className="text-lg mb-6">
              Based on your previous choices, our site will analyze our huge
              database of readers' favorite books to provide book
              recommendations and suggestions for what to read next.
            </p>
            <div>
              <RecoButton></RecoButton>
            </div>
          </div>
          <div>
            <img src="/Reco-image.png" alt="Recommendation" className="w-80 " />
          </div>
        </div>

        <Quote></Quote>
        <Footer></Footer>
      </div>
    </>
  );
}
