

import DisplayReadBook from '@/components/recommandation/DiaplayReadBook'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {
    const session = await getServerSession(authOptions)

    let getReadBooks = [];
    try {
        // getLikedbooks = await db.UserHistory.findMany({
        //     where: {
        //         userId: session?.user.id,
        //     }
        // })
        // getLikedbooks = await axios.get('/api/books/getLikedBooks')
        // if (!getLikedbooks || getLikedbooks.length === 0) {
        //     console.log("No liked books found")
        // }

        getReadBooks = await db.note.findMany({
            where: {
                userId: session?.user.id,
                fileName: 'dummy.pdf'
            }
        })
        console.log("getReadBooks", getReadBooks)

    } catch (error) {
        console.error("Error getting liked books:", error);
    }
    return (
        <div className='max-h-screen overflow-scroll no-scrollbar'>
            <DisplayReadBook readbooks={getReadBooks} />

        </div>
    )
}

export default page
