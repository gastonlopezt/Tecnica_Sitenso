'use client'
import Link from 'next/link';
import { useContext, useState, useEffect} from "react";
import { ComicContext } from "@/context/ComicContext";

const Charact = () => {
  const {characters, searchTerm} = useContext(ComicContext);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 6;

  //Filtering Characters
  useEffect(() => {
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCharacters(filtered);
  }, [searchTerm, characters]);

//Pagination Logic
  const totalPages = Math.ceil(filteredCharacters.length / charactersPerPage);
  const lastPostIndex = currentPage * charactersPerPage;
  const firstPostIndex = lastPostIndex - charactersPerPage;
  const currentCharacters = filteredCharacters.slice(firstPostIndex, lastPostIndex)
  const maxVisiblePages = 4;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="grid grid-cols-2 mt-5 gap-2 md:grid-cols-3">
        {currentCharacters
          .filter((character) => character.thumbnail.path && character.name )
          .map((character) => (
            <div className="bg-red-600 h-48 gap-4 m-2 rounded-sm shadow-lg md:h-72" key={character.id}>
              <Link href={`/characters/${character.id}`}>
                <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} className="h-32 w-full md:h-60" />
                <h2 className="text-lg text-white text-center">{character.name}</h2>
              </Link>
            </div>
          ))}
      </div>
          {/* Pagination Config */}
          <div className="mt-2">
            <div className=" flex flex-row justify-center mt-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((pageNumber) =>
              pageNumber === 1 ||
              pageNumber === totalPages ||
              Math.abs(pageNumber - currentPage) <= maxVisiblePages / 2
              )
              .map((pageNumber) => (
                <Link href={`/characters`} key={pageNumber}>
                  <div
                    className={`text-sm md:text-lg md:p-2 mx-2 rounded-md lg:h-12 ${
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

export default Charact;