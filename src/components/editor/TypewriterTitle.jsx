"use client";
import React from "react";
import Typewriter from "typewriter-effect";

const TypewriterTitle = () => {
  return (
    <Typewriter
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("📚 Fun Way To Take Notes")
          .pauseFor(1000)
          .deleteAll()
          .typeString("AI Powered")
          .start();
      }}
    />
  );
};

export default TypewriterTitle;
