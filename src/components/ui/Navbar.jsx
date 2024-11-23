import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SignOut from "./SignOut";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  // console.log("session with google", session);

  return (
    <header className="flex items-center h-16 px-4 border-b bg-white lg:px-6 dark:bg-gray-950 max-w-full">
      <div className="ml-auto flex items-center space-x-4">
        <div className="text-sm font-medium">
          {session.user.username ? session.user.username : session.user.name}
        </div>
        {session?.user ? (
          <SignOut />
        ) : (
          <Link className={buttonVariants()} href="/auth/login">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
