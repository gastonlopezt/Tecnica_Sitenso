'use client'
import { useContext, useEffect, useState } from 'react';
import { ComicContext } from '@/context/ComicContext';
import Link from 'next/link';


const Page = () => {
  const { comics, searchTerm } = useContext(ComicContext);
  const [filteredComics, setFilteredComics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const comicsPerPage = 6;

//Filtering Comics
  useEffect(() => {
    const filtered = comics.filter((comic) =>
      comic.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredComics(filtered);
    
  }, [searchTerm, comics]);

//Pagination Logic
  const totalPages = Math.ceil(filteredComics.length / comicsPerPage);
  const indexOfLastComic = currentPage * comicsPerPage;
  const indexOfFirstComic = indexOfLastComic - comicsPerPage;
  const currentComics = filteredComics.slice(indexOfFirstComic, indexOfLastComic);
  const maxVisiblePages = 4;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
    <div className="grid grid-cols-2 mt-5 gap-2 md:grid-cols-3">
      {currentComics
        // .filter((comic) => comic.thumbnail && comic.title && comic.dates && comic.description)
        .map((comic) => (
          <div className="bg-red-600 h-48 gap-4 m-2 rounded-sm shadow-lg lg:h-72" key={comic.id}>
            <Link href={`/comics/${comic.id}`}>
              <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} className="h-28 w-full lg:h-48" />
              <h2 className="text-lg text-white text-center">{comic.title}</h2>
              <p className="text-white">{comic.dates.date}</p>
              {/*<span className="text-white">{comic.description}</span> */}
            </Link>
          </div>
      
        ))}
      </div>
      {/* Pagination Config */}
      <div className="mt-2">
        <div className='flex flex-row justify-center mt-4 mb-2 '>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((pageNumber) =>
            pageNumber === 1 ||
            pageNumber === totalPages ||
            Math.abs(pageNumber - currentPage) <= maxVisiblePages / 2
          )
          .map((pageNumber) => (
            <Link href={`/comics`} key={pageNumber}>
              <div
                className={`text-sm md:text-lg md:p-2 mx-2 rounded-lg lg:h-12 ${
                  pageNumber === currentPage ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page