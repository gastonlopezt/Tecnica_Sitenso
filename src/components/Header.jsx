'use client'
import { useContext, useState } from 'react';
import Link from 'next/link';
import { ComicContext } from '@/context/ComicContext';
import Image from 'next/image';

const Header = () => {
  const { setSearchTerm } = useContext(ComicContext);
  const [inputValue, setInputValue] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(inputValue);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    
    
  };

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
    return (isSearchOpen)
    
  };

  return (
    <header className='lg:max-h-60'>
      <div className='bg-red-600 flex flex-row'>
        <div className="w-3/4">
          {/* Hamburguer Menu */}
          <div className='flex '>
            <button
              className="pl-2 text-white"
              onClick={handleMenuClick}
            >
              <Image src="/images/tres-puntos.png" alt="Hamburguer Menu" width={32} height={32}  className='w-full' />
            </button>
            <Link href="/" className="">
              <h1 className='text-3xl text-white font-bold uppercase font '>Marvel</h1>
            </Link>
          </div>
        </div>
        <div className="w-1/4">
          {/*  */}
          {(!isSearchOpen) 
            ? 
            <button
            className="p-2 text-white"
            onClick={handleSearchClick}
            >
            <Image src="/images/buscar.png" alt="Search Icon"  width={23} height={25} className='h-15 lg:max-h-15 w-full'/>
            </button> : 
              <div className="bg-red-600 text-white">
                <form onSubmit={handleSubmit} className='p-2'>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Search..."
                    className="w-full px-2 py-1 rounded border-gray-300 focus:outline-none text-gray-600 "
                  />
                </form>
              </div>
            }
        </div>
      </div>
      
      {/* Hamburguer menú */}
      {isMenuOpen && (
        <div className="bg-black text-red-600 sm:max-h-12 md:max-h-10">
          <ul className='flex flex-row text-xl p-3 text-left'>
            <li className='w-1/3'>
              <Link href="/">Home</Link>
            </li>
            <li className='w-1/3'>
              <Link href="/characters">Characters</Link>
            </li>
            <li className='w-1/3'>
              <Link href="/comics">Comics</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;