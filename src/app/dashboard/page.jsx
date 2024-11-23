import ShinyButton from "@/components/magicui/shiny-button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import DisplayDashboardBooks from "@/components/dashboard/DisplayDashboardBooks";
import Link from "next/link";
//Demo page
//this is temparary page, besti

const page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      {/* <div>Home page</div>
      <div className="bg-white w-full h-96 flex flex-col justify-between items-center relative" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
              <div className="absolute top-0 left-0 w-full h-full z-0" style={{ backgroundImage: 'url("/welcome.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <div className="z-10 w-full h-full flex flex-col justify-between items-center">
                  <h1 className="mt-10 text-3xl font-semibold text-black">Explore Your Next Favorite Reads!</h1>
                  <div className="flex justify-center items-end pb-16">
                      
                  </div>
              </div>
          </div> */}

      <div className="container px-0 max-h-screen ">
        <div className="flex items-center justify-between w-full rounded-md p-4 bg-gradient-to-r from-[#DCC5E2] to-[#E8D9EC]">
          <div className="w-full items-center ">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to BookHub{`# ${session.user.username}`}
            </h1>
            <div className="w-1/2">
              <p className="text-lg mb-6">
                Your ultimate destination for discovering, reviewing, and
                sharing the love for books.
              </p>
            </div>
            {/* <div className="btn flex items-center justify-center w-[15em] h-[4em] rounded-[3em] bg-[#B574C8] text-white font-semibold">
              VIEW RECOMMENDATIONS
            </div> */}
            <div className="rounded-2xl bg-purple-300  w-fit">
              <Link href="/dashboard/recommandation/">
                <ShinyButton text={`VIEW RECOMMENDATIONS`} />
              </Link>
            </div>
          </div>
          <div>
            <img
              src="/cupwelcome.png"
              alt="Recommendation"
              className="w-60 h-auto"
            />
          </div>
        </div>
        <div>
          <div>
            <h1 className="text-2xl font-bold mt-8">Your Liked Books</h1>
          </div>
          <DisplayDashboardBooks user={session?.user?.id} />
        </div>
      </div>
    </>
  );
};

export default page;
