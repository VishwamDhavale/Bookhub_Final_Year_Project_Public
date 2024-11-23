"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import GoogleButton from "@/components/authui/GoogleButton";

export default function LoginPage() {
  // State to manage email and password input values
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  // Function to handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Function to handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can handle form submission logic, like sending data to a server
    // console.log("Email:", Email);
    // console.log("Password:", Password);
    // Reset input fields after submission if needed
    setEmail("");
    setPassword("");

    const data = JSON.stringify({
      email: Email,
      password: Password,
      username: Name,
    });
    try {
      const respone = await fetch("/api/auth/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });

      if (respone.ok) {
        // router.push("/auth/login");
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
          router.push("/preferences");
        }
      } else {
        toast({
          title: "Error",
          description: "OOP! Something went wrong! at signup",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "OOP! Something went wrong!",
      });
    }
  };

  return (
    <div className="w-full gap-10 lg:grid lg:min-h-[600px] lg:grid-cols-2 lg:gap-0 xl:min-h-[800px]">
      <div className="flex items-center justify-center p-6 lg:p-10">
        <div className="mx-auto w-[350px] space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign up your account</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your email below to login to your account
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  id="name"
                  value={Name}
                  onChange={handleNameChange}
                  placeholder="User name"
                  required
                  type="text"
                />
              </div>
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
              <div className="flex items-center">
                <Checkbox id="tos" />
                <label
                  className="ml-2 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="tos"
                >
                  I agree to the
                  <Link className="underline" href="#">
                    Terms and Conditions
                  </Link>
                </label>
              </div>

              <Button className="w-full" type="submit">
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden bg-gray-100 lg:block dark:bg-gray-800">
        <img
          alt="Image"
          className="h-full w-full object-cover"
          height="1080"
          src="/signupimage.jpg"
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
