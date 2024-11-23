"use client";
import React from "react";
import { Button } from "./button";
import { handleSignOut } from "@/lib/handleSignOut";

const SignOut = () => {
  const handlesubmit = async () => {
    await handleSignOut();
  };

  return <Button onClick={handlesubmit}>Sign Out</Button>;
};

export default SignOut;
