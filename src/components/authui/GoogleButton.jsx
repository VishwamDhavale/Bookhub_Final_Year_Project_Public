import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { Button } from "../ui/button";

const GoogleButton = () => {
  const [isLoading, setLoading] = useState(false);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      await signIn("google", {
        callbackUrl: "http://localhost:3000/dashboard",
      });
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  // signIn("google", {
  //   callbackUrl: "http://localhost:3000/dashboard",
  // });
  return (
    <Button
      onClick={loginWithGoogle}
      className="w-full"
      type="button"
      variant="outline"
    >
      {isLoading && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 mr-2 animate-spin"
        >
          <path d="M21 12a9 9 0 1 1-6 219-8.56" />
        </svg>
      )}
      Sign up with Google
    </Button>
  );
};

export default GoogleButton;
