
import SearchResultsDetails from '@/components/recommandation/SearchResultsDetails';
import React from 'react';


const Page = ({ params }) => {
    const { bookId } = params; // Destructure bookId from params
    console.log("bookId", bookId); // This should log the correct bookId

    return (
        <div>
            <SearchResultsDetails bookId={bookId} />
        </div>
    );
}

export default Page;
