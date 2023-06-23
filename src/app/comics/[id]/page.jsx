'use client'
import React from 'react'
import { useContext} from 'react';
import { ComicContext } from '@/context/ComicContext';

const ComicDetailsPage = () => {
  const {comicData} = useContext(ComicContext)
  console.log('comicData:', comicData)
   if (!comicData) {
    return <div>Loading...</div>;
  }
    
  return (
    <div>
    {comicData && (
      <div key={comicData.id}>
        <img src={`${comicData.thumbnail.path}.${comicData.thumbnail.extension}`} className="w-full h-72 md:h-96" />
        <h2 className="text-lg text-black text-center md:text-2xl lg:text-3xl">
        <span className='text-xl text-black text-center md:text-2xl lg:text-3xl font-bold'>Name: </span>
          {comicData.title}
        </h2>
        <p className='text-lg text-black text-center lg:text-2xl mt-2 mb-2'>
          <span className='underline font-bold'>Comic Description:</span>
          {comicData.description}
        </p>
        <p className='underline font-bold text-lg text-black text-center lg:text-2xl mt-2 mb-2'>Characters: </p>
        {comicData.characters.items.map((item) => (
          <p className='text-lg text-black text-center md:text-2xl lg:text-3xl mt-2 ' key={item.resourceURI}>
            {item.name}
          </p>
        ))}
      </div>
    )}
  </div>
  );
};

export default ComicDetailsPage