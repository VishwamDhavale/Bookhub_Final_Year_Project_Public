import { Inter } from "next/font/google";
import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/Provider";
import TanProvider from "@/components/TanProvider";
import "@uploadthing/react/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bookhub",
  description:
    "Discover your next favorite book with BookHub! Explore a vast collection of books, get personalized recommendations, and connect with fellow book lovers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className=" max-w-screen max-h-screen">
      <body className={inter.className}>
        <Provider>
          <TanProvider>
            {children}
            <SpeedInsights />
          </TanProvider>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
