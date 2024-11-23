import React from "react";

// the page container body
export default function PageWrapper({ children }) {
  return (
    <div className="flex flex-col pt-2 px-4 space-y-2 bg-zinc-100 flex-grow pb-4">
      {children}
    </div>
  );
}
