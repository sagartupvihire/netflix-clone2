import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useContentStore } from '../store/content';
import { Search } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../utils/constants';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");

  const [results, setResults] = useState([]);
  const { setContentType } = useContentStore();

  const handleTabClick = (tab) =>{
    setActiveTab(tab);
    tab === "movie" ? setContentType("movie") : setContentType("tv");
    setResults([]);
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/search/${activeTab}/${searchTerm}`);
      console.log(res);
      
      setResults(res.data.content);
    } catch (error) {
      if(error.response.status === 404) {
        console.log("No results found");
        toast.error("No results found")
      } else{
        console.log("An error occurred, please try again later.");
        toast.error("An error occurred, please try again later.");
      } 
     }
    }

  console.log("result: " + results);
  
  return (
    <div className='bg-black min-h-screen text-white'>
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        <div className='flex justify-center gap-3 mb-4'>
          <button className={`py-2 px-4 rounded ${activeTab === 'movie' ? "bg-red-600" : "bg-gray-800"}  hover:bg-red-700`} onClick={() => handleTabClick("movie")}>Movie</button>
          <button className={`py-2 px-4 rounded ${activeTab === 'tv' ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`} onClick={() => handleTabClick("tv")}>Tv Shows</button>
          <button className={`py-2 px-4 rounded ${activeTab === 'person' ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`} onClick={() => handleTabClick("person")}>Person</button>

        </div>
        <form className='flex gap-2 items-stretch mb-8 max-w-2xl mx-auto' onSubmit={handleSearch}>
            <input type='text'
              className='w-full py-2 px-4 border border-gray-300 rounded-md bg-transparent focus:bg-transparent focus:ring focus:border-red-600'
              placeholder={"Search for a " + activeTab}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className='bg-red-600 hover:bg-red-700 text-white p-2 rounded'>
              <Search className='w-6 h-6' />
            </button>
        </form>

        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
          {results?.map((result) => {
            if(!result.poster_path && !result.profile_path){
              return null;
            }
            return(
							<div key={result.id} className='bg-gray-800 p-4 rounded'>
								{activeTab === "person" ? (
									<div className='flex flex-col items-center'>
										<img
											src={ORIGINAL_IMG_BASE_URL + result.profile_path}
											alt={result.name}
											className='max-h-96 rounded mx-auto'
										/>
										<h2 className='mt-2 text-xl font-bold'>{result.name}</h2>
									</div>
								) : (
									<Link
										to={"/watch/" + result.id}
										onClick={() => {
											setContentType(activeTab);
										}}
									>
										<img
											src={ORIGINAL_IMG_BASE_URL + result.poster_path}
											alt={result.title || result.name}
											className='w-full h-auto rounded'
										/>
										<h2 className='mt-2 text-xl font-bold'>{result.title || result.name}</h2>
									</Link>
								)}
							</div>
						);
          })}
        </div>
      </div>
    </div>
  )
}

export default SearchPage