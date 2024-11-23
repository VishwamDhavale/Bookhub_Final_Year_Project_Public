import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

export default function SearchButton() {
  return (
    <>
      <Link
        href="/dashboard/recommandation/searchResult"
        as="/dashboard/recommandation/searchResult"
        className="btn flex items-center justify-center w-[15em] h-[5em] rounded-[3em] bg-[#1C1A1C] cursor-pointer transition-all duration-450 ease-in-out hover:bg-gradient-to-r hover:from-[#FF7F7F] hover:to-[#FF3333] hover:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.4),inset_0px_-4px_0px_0px_rgba(0,0,0,0.2),0px_0px_0px_4px_rgba(255,255,255,0.2),0px_0px_180px_0px_#FF4C4C] hover:transform hover:translate-y-[-2px]"
      >
        <SearchIcon className=" text-white" />
        <span className="text font-semibold text-white text-medium transition-all duration-800 ease">
          Search by Name
        </span>
      </Link>
    </>
  );
}
