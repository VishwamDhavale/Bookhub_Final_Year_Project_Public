
import Displaylikedbooks from '@/components/recommandation/Displaylikedbooks'
import { authOptions } from '@/lib/auth'
import { bigIntToString } from '@/lib/bigIntToString'
import { db } from '@/lib/db'


import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {
    const session = await getServerSession(authOptions)

    let getLikedbooks = [];
    try {
        // getLikedbooks = await db.UserHistory.findMany({
        //     where: {
        //         userId: session?.user.id,
        //     }
        // })

        getLikedbooks = await db.UserHistory.findMany({
            where: {
                userId: session?.user.id,
            },
            include: {
                books: true, // Include related AllBooks data
            },
        });
        console.log("getLikedbooks", getLikedbooks)

        getLikedbooks = getLikedbooks.map(book => ({
            ...book,
            id: book.id, // Assuming UserHistory has an 'id' field
            bookId: book.books.id, // Assuming AllBooks has an 'id' field
            title: book.books.title,
            cover_image: book.books.cover_image,
            // Include other necessary fields
        }));

        var serializedData = bigIntToString(getLikedbooks);
        console.log("serializedData", serializedData)
        // getLikedbooks = await axios.get('/api/books/getLikedBooks')
        if (!serializedData || serializedData.length === 0) {
            console.log("No liked books found")
        }
    } catch (error) {
        console.error("Error getting liked books:", error);
    }
    return (
        <div className='max-h-screen overflow-scroll no-scrollbar'>
            <Displaylikedbooks likedbooks={serializedData} />

        </div>
    )
}

export default page
