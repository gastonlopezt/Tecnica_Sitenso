'use client'
import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

const ComicContext = createContext();

const ComicProvider = ({ children }) => {
  const [comics, setComics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [characters, setCharacters] = useState([]);
  const {id} = useParams()
  const [comicData, setComicData] = useState(null)
  const [characterData, setCharacterData] = useState(null)
  
//Getting the Comics from the API and putting it into a state variable

  const getComics = async () => {
    const res = await fetch(`https://gateway.marvel.com/v1/public/comics?limit=90&ts=1&apikey=e1b7e33aad043106e691dee7baf77ea4&hash=e9e10efe1c5be45f33e55c8477a73cc4`);
    if (!res.ok) {
      throw new Error('failed to fetch data');
    }
    const data = await res.json();
    return data.data.results;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getComics();
        setComics(data);
      } catch (error) {
        console.error(error);
      }
    };
      fetchData();
  }, []);
 

//Getting the Characters from the API and putting it into a state variable 

const getCharacters = async () => {
  const res = await fetch(`http://gateway.marvel.com/v1/public/characters?limit=90&ts=1&apikey=e1b7e33aad043106e691dee7baf77ea4&hash=e9e10efe1c5be45f33e55c8477a73cc4`)
  if(!res.ok){
      throw new Error('failed to fetch data')
  }
  const data = await res.json()
  return data.data.results
}
useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getCharacters();
      setCharacters(data);
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();
  
}, []);

//Getting the API Comic-data from the ID
  const fetchComicData = async () => {
    try {
      if (id) {
        const response = await axios.get(`http://gateway.marvel.com/v1/public/comics/${id}?ts=1&apikey=e1b7e33aad043106e691dee7baf77ea4&hash=e9e10efe1c5be45f33e55c8477a73cc4`);
        setComicData(response.data.data.results[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchComicData();
  }, [id]);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchComicData();
    }, 2000);
  
    return () => clearTimeout(timeout);
  }, [id]);

 
//Getting the API Character-data from the ID
const fetchCharacterData = async () => {
  try {
    if (id) {
      const response = await axios.get(`http://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=e1b7e33aad043106e691dee7baf77ea4&hash=e9e10efe1c5be45f33e55c8477a73cc4`);
      setCharacterData(response.data.data.results[0]);
    }
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchCharacterData();
}, [id]);

useEffect(() => {
  const timeout = setTimeout(() => {
    fetchCharacterData();
  }, 2000);

  return () => clearTimeout(timeout);
}, [id]);


  return (
    <ComicContext.Provider value={{ comics, getComics, searchTerm, setSearchTerm, characters, comicData, characterData}}>
      {children}
    </ComicContext.Provider>
  );
};

export { ComicContext, ComicProvider };