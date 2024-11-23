import React from "react";
//Demo page
//this is temparary page, besti

export default function home() {
  return (
    <>     
          <div className="flex items-center justify-between rounded-md p-4 bg-gradient-to-r from-[#DCC5E2] to-[#E8D9EC]">
            <div className="max-w-lg items-center ">
              <h1 className="text-4xl font-bold mb-4">Welcome to BookHub</h1>
              <p className="text-lg mb-6">
              Your ultimate destination for discovering, reviewing, and sharing the love for books.
              </p>
               <div className="btn flex items-center justify-center w-[15em] h-[5em] rounded-[3em] bg-[#B574C8]"> </div>
            </div>
            <div>
              <img src="/cupwelcome.png" alt="Recommendation" className="w-60 h-auto"/>
            </div>
          </div>
          
    </>
  );
}
