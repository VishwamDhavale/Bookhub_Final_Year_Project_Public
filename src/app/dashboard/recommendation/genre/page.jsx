import React from 'react';

const genres = [
    { name: 'Science Fiction', link: '/subject/science+fiction' },
    { name: 'Human Alien Encounters', link: '/subject/human-alien+encounters' },
    { name: 'Adventure Stories', link: '/subject/adventure+stories' },
    { name: 'Fantasy Fiction', link: '/subject/fantasy+fiction' },
    { name: 'Time Travel', link: '/subject/time+travel' },
    { name: 'Young Adult Fiction', link: '/subject/young+adult+fiction' },
    { name: 'Love Stories', link: '/subject/love+stories' },
    { name: 'Romance', link: '/subject/romance' },
    { name: 'Frontier and Pioneer Life', link: '/subject/frontier+and+pioneer+life' },
    { name: 'Historical Fiction', link: '/subject/historical+fiction' },
    { name: 'Dystopias', link: '/subject/dystopias' },
    { name: 'Thrillers & Suspense', link: '/subject/thrillers+&amp;+suspense' }
];

const GenreLink = ({ name, link }) => (
    <a href={link} className="bg-gray-100 border border-gray-300 p-4 rounded-lg hover:bg-gray-200 transition duration-300 ease-in-out">
        {name}
    </a>
);

const PopularSubjects = () => {
    return (
        <div className="bg-white py-12 md:py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold text-center mb-8 md:mb-10">Popular Subjects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                {genres.map(genre => (
                    <GenreLink key={genre.name} name={genre.name} link={genre.link} />
                ))}
            </div>
        </div>
    );
};

export default PopularSubjects;
