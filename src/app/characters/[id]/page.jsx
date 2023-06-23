'use client'
import { useContext} from 'react';
import { ComicContext } from '@/context/ComicContext';

const CharacterDetail = () => {
  const {characterData} = useContext(ComicContext)
  console.log('characterData:', characterData)
   if (!characterData) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      {characterData && (
        <div key={characterData.id}>
          <img src={`${characterData.thumbnail.path}.${characterData.thumbnail.extension}`} className="w-full h-72 md:h-96" />
          <h2 className="text-xl text-black text-center md:text-2xl lg:text-3xl font-bold">
            <span className='text-xl text-black text-center md:text-2xl lg:text-3xl font-bold'>Character: </span>
            {characterData.name}
          </h2>
          <p className='text-lg text-black text-center lg:text-2xl mt-2 mb-2'>
            <span className='underline font-bold'>Description:</span>
            {characterData.description}
          </p>
          <p className='underline font-bold text-lg text-black text-center lg:text-2xl mt-2 mb-2'>Comics:</p>
          {characterData.comics.items.map((item) => (
          <div>
          <p className='text-lg text-black text-center md:text-2xl lg:text-3xl mt-2' key={item.resourceURI}>
            {item.name}
          </p>
          </div>
        ))}
        </div>
      )

      }
    </div>
  )
}

export default CharacterDetail
