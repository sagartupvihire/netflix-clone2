import React, { useEffect, useRef, useState } from 'react';
import { useContentStore } from '../store/content';
import axios from 'axios';
import { SMALL_IMG_BASE_URL } from '../utils/constants'
import { Link } from 'react-router-dom';
import {ChevronLeft, ChevronRight} from 'lucide-react';
const MovieSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const formatcategoryName = category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
  const formatcategory = contentType === 'movie' ? 'Movies' : 'TV shows';
  const [content, setcontent] = useState([]);
  const [showArrows, setshowArrows] = useState(false);
  const slideRef = useRef(null)

  useEffect(() => async () => {
    const getContent = async () => {
      const res = await axios.get(`api/${contentType}/${category}`);
      setcontent(res.data.content)

    };

    getContent();

  }, [contentType, category]);

  const scrollLeft =() =>{
    if(slideRef.current){
      slideRef.current.scrollBy({left : -slideRef.current.offsetWidth, behavior :'smooth'});
    }

  }
  const scrollRight =() =>{
    if(slideRef.current){
      slideRef.current.scrollBy({left : slideRef.current.offsetWidth, behavior :'smooth'});
    }
  }
  return (
    <div className='text-white bg-black relative px-5 md:px-20'
    onMouseEnter={()=>{setshowArrows(true)}}
    onMouseLeave={()=>{setshowArrows(false)}}
    >
      <h2 className='mb-4 text-2xl font-bold'>
        {formatcategoryName} {formatcategory}
      </h2>

      <div className='flex space-x-4 overflow-x-scroll scrollbar-hide' ref={slideRef}>
        {content.map((item) => (
          <Link to={`/watch/${item.id}`} className='min-w-[250px] relative group' key={item.id}>
            <div className='rounded-lg overflow-hidden'>
              <img
                src={SMALL_IMG_BASE_URL + item.backdrop_path}
                alt='Movie image'
                className='transition-transform duration-300 ease-in-out group-hover:scale-125'
              />
            </div>
            <p className='mt-2 text-center'>{item.title || item.name}</p>
          </Link>
        ))}
      </div>

      {showArrows &&(
        <>
          <button onClick={scrollLeft} className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 text-white z-10 '>
              <ChevronLeft size={24}></ChevronLeft>
          </button>
          <button onClick={scrollRight} className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 text-white z-10'>
              <ChevronRight size={24}></ChevronRight>
          </button>
        </>
      )}
    </div>
  )
}

export default MovieSlider