'use client'

import React, { useState } from 'react'
import{Search} from "lucide-react"
//import { words } from '@/lib/data'   hanga address ghala 



const Searchbar = () => {

    const [activeSearch, setActiveSearch] = useState([])

    const handleSearch = (e) => {
        if(e.target.value == ''){
            setActiveSearch([])
            return false
        }
        setActiveSearch(words.filter(w => w.includes(e.target.value)).slice(0,8))
    }

  return (
    <form className='w-[500px] relative'>
        <div className="relative">
            <input type="search" placeholder='  Type the title or the author of a book' className='w-full p-4 rounded-full bg-white outline-none' onChange={(e) => handleSearch(e)}/>
            <button className='absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-[#F15C5C] rounded-full'>
                <Search/>
            </button>
        </div>
        {/* bg-slate-800 */}
        {
            activeSearch.length > 0 && (
                <div className="absolute top-20 p-4 bg-white text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2">
                    {
                        activeSearch.map(s => (
                            <span>{s}</span>
                        ))
                    }
                </div>
            )
        }
 
    </form>
  )
}

export default Searchbar