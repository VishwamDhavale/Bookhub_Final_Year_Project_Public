import React from "react";

// ensure that sidebar and page don't overlap
export default function MarginWidthWrapper({ children }) {
  return (
    <div className="flex flex-col h-screen overflow-y-scroll no-scrollbar md:ml-0 sm:border-r sm:border-zinc-700 w-full">
      {children}
    </div>
  );
}
