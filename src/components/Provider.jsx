"use client";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

const Provider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
