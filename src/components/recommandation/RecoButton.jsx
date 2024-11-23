"use client"
import Link from 'next/link'
import React from 'react'

export default function RecoButton() {
  return (
    <>
            <Link 
                href="/dashboard/recommandation/reco-navbar" 
                as="/dashboard/recommandation/reco-navbar" 
                className="btn flex items-center justify-center w-[15em] h-[5em] rounded-[3em] bg-[#1C1A1C] cursor-pointer transition-all duration-450 ease-in-out hover:bg-gradient-to-r hover:from-[#FF7F7F] hover:to-[#FF3333] hover:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.4),inset_0px_-4px_0px_0px_rgba(0,0,0,0.2),0px_0px_0px_4px_rgba(255,255,255,0.2),0px_0px_180px_0px_#FF4C4C] hover:transform hover:translate-y-[-2px]"
              >
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  className="sparkle fill-white transition-all duration-800 ease"
                > 
                  <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
                </svg>
                <span className="text font-semibold text-white text-medium transition-all duration-800 ease">Recommend</span>
              </Link>

    </>
  )
}


