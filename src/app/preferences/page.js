// import GenreSelector from '@/components/prefrences/GenreSelector'
import GenreSelector from '@/components/prefrences/BooksRating'
import { db } from '@/lib/db'
import React from 'react'

const page = async () => {
    const genres = await db.Genre.findMany()

    if (!genres || genres.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <p>No genres found. Please check your database connection.</p>
            </div>
        )
    }

    return (
        <div>
            <GenreSelector genres={genres} />
        </div>
    )
}

export default page