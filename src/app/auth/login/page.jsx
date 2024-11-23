"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GoogleButton from "@/components/authui/GoogleButton";
import Image from "next/image";

export default function LoginPage() {
  // State to manage email and password input values
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  // Function to handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Function to handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can handle form submission logic, like sending data to a server
    console.log("Email:", Email);
    console.log("Password:", Password);

    // const data = JSON.stringify({
    //   email: Email,
    //   password: Password,
    // });

    // const respone = await fetch("/api/auth", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application",
    //   },
    //   body: data,
    // });

    // console.log("respone", respone);
    // Reset input fields after submission if needed

    const signInData = await signIn("credentials", {
      email: Email,
      password: Password,
      redirect: false,
    });

    if (signInData?.error) {
      toast({
        title: "Error",
        description: "OOP! Something went wrong!",
      });
    } else {
      router.refresh();
      router.push("/dashboard");
    }

    // setEmail("");
    // setPassword("");
  };

  return (
    <div className="w-full gap-10 lg:grid lg:min-h-[600px] lg:grid-cols-2 lg:gap-0 xl:min-h-[800px]">
      <div className="flex items-center justify-center p-6 lg:p-10">
        <div className="mx-auto w-[350px] space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign in to your account</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your email below to login to your account
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={Email}
                  onChange={handleEmailChange}
                  placeholder="m@example.com"
                  required
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  value={Password}
                  onChange={handlePasswordChange}
                  required
                  type="password"
                />
              </div>
              <Button className="w-full" type="submit">
                Sign in
              </Button>
            </div>
          </form>

          <GoogleButton />
          <div className="mt-4 text-center text-sm">
            Don't have an account?
            <Link className="underline" href="/auth/signup">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-gray-100 lg:block dark:bg-gray-800">
        <Image
          alt="Image"
          className="h-full w-full object-cover"
          height="1080"
          src="/loginimage.jpg"
          style={{
            aspectRatio: "1920/1080",
            objectFit: "cover",
          }}
          width="1920"
        />
      </div>
    </div>
  );
}
