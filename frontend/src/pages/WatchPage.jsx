import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { useContentStore } from '../store/content';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { ChevronLeft, ChevronRight, ClipboardCheck } from 'lucide-react';
import ReactPlayer from 'react-player';
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../utils/constants'
import { formatReleseDate } from '../utils/datefunction';
import WatchPageSkeleton from '../components/WatchPageskeleton';
const WatchPage = () => {
    const { id } = useParams();
    const [trailers, settrailers] = useState([])
    const [currentTrailersIdx, setcurrentTrailersIdx] = useState(0);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState({});
    const [similarContent, setsimilarContent] = useState([]);
    const { contentType } = useContentStore();
    const sliderRef = useRef(null);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: 'smooth' });
        }

    }
    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: 'smooth' });
        }
    }



    useEffect(() => {
        const getTrailers = async () => {
            try {
                const response = await axios.get(`/api/${contentType}/${id}/trailers`);
                console.log("trailer", response);

                settrailers(response.data.trailers || []);
            } catch (error) {
                if (error.message.includes('404')) {
                    console.log('No Trailers found');
                    settrailers([])
                }
            }
        }
        getTrailers();
    }, [contentType, id]);

    useEffect(() => {
        const getSimilarContent = async () => {
            try {
                const response = await axios.get(`/api/${contentType}/${id}/similar`);
                console.log("similar", response);

                setsimilarContent(response.data.similar);

            } catch (error) {
                if (error.message.includes('404')) {
                    console.log('No Trailers found');
                    setsimilarContent([])
                }
            }
        }
        getSimilarContent();
    }, [contentType, id]);


    useEffect(() => {
        const getContentDetails = async () => {
            try {
                const response = await axios.get(`/api/${contentType}/${id}/details`);
                console.log("similar", response);

                setContent(response.data.content);

            } catch (error) {
                if (error.message.includes('404')) {
                    console.log('No Trailers found');
                    setContent([])
                }
            } finally {
                setLoading(false);
            }
        }
        getContentDetails();
    }, [contentType, id]);

    console.log("trailers", trailers);
    console.log("similarContent", similarContent);
    console.log("contentdescription", content);

    const handleNext = () => {
        console.log(currentTrailersIdx);

        if (currentTrailersIdx < trailers.length - 1) setcurrentTrailersIdx(currentTrailersIdx + 1);
    }

    const handleprev = () => {
        console.log(currentTrailersIdx);
        if (currentTrailersIdx > 0) {
            setcurrentTrailersIdx(currentTrailersIdx - 1);
        }

    }

    if (loading) return (
        <div className='min-h-screen bg-black p-10'>
            <WatchPageSkeleton />
        </div>
    )

    if (!content) {
        <div className='bg-black text-white h-screen'>
            <div className='max-w-6xl mx-auto'>
                <Navbar />
                <div className='text-center mx-auto px-4 py-8 h-full mt-40'>
                    <h2 className='text-2xl sm:text-5xl font-bold text-balance'>Content not found 😥</h2>
                </div>
            </div>
        </div>
    }

    return (
        <div className='bg-black min-h-screen text-white'>
            <div className='mx-auto container px-4 py-8 h-full'>
                <Navbar />
                {trailers?.length > 0 && (
                    <div className='flex justify-between mb-4'>
                        <button onClick={handleprev} className={
                            `bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded 
                                ${currentTrailersIdx === 0 ? 'cursor-not-allowed opacity-50' : ''}`

                        } disabled={currentTrailersIdx === 0}>
                            <ChevronLeft size={24} />
                        </button>

                        <button onClick={handleNext} className={
                            `bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded 
                                ${currentTrailersIdx === trailers.length - 1 ? 'cursor-not-allowed opacity-50' : ''}`

                        } disabled={currentTrailersIdx === trailers.length - 1}>
                            <ChevronRight size={24} />
                        </button>
                    </div>
                )}

                <div className='aspect-video  p-2 mb-8 sm:px-32'>
                    {trailers.length > 0 && (
                        <ReactPlayer
                            controls={true}
                            width={"100%"}
                            height={"70vh"}
                            className="mx-auto overflow-hidden rounded-lg "
                            url={`https://www.youtube.com/watch?v=${trailers[currentTrailersIdx].key}`}
                        />
                    )}

                    {trailers?.length === 0 && (
                        <h2 className='text-xl text-center mt-5'>
                            No Trailers found for this content.{" "}
                            <span className='font-bold text-rose-500'>{content?.title || content?.name}</span>
                        </h2>
                    )
                    }
                </div>
                {/* movie details */}
                <div className='flex flex-col md:flex-row
                items-center justify-center gap-10 max-w-6xl mx-auto
                '>
                    <div className='mb-4 md:mb-0'>
                        <h2 className='text-5xl text-balance'>
                            {content?.title || content?.name}
                        </h2>
                        <p className='mt-2 text-lg'>
                            {formatReleseDate(content?.release_date || content?.first_air_date)} {' '}
                            {content?.adult ? (
                                <span className='text-red-600'>18+</span>
                            ) : (
                                <span className='text-green-600'>PG-13</span>
                            )}{" "}
                        </p>
                        <p className='mt-4 text-lg'>{content?.overview}</p>
                    </div>
                    <img src={ORIGINAL_IMG_BASE_URL + content?.poster_path} alt='poster-image'
                        className='max-h-[600px] rounded-md'
                    />
                </div>

                {similarContent.length > 0 && (
                    <div className='mt-12 max-w-5xl mx-auto relative'>
                        <h3 className='text-3xl font-bold mb-4'>Similar Movies/Tv Show</h3>

                        <div className='flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group' ref={sliderRef}>
                            {similarContent.map((content) => {
                                if (content.poster_path === null) return null;
                                return (
                                    <Link to={`/watch/${content.id}`} className='min-w-[250px] relative group' key={content.id}>
                                        <div className='rounded-lg overflow-hidden'>
                                            <img
                                                src={SMALL_IMG_BASE_URL + content.backdrop_path}
                                                alt='Movie image'
                                                className='transition-transform duration-300 ease-in-out hover:scale-125'
                                            />
                                        </div>
                                        <p className='mt-2 text-center'>{content.title || content.name}</p>
                                    </Link>
                                );
                            })}

                            <ChevronRight
                                className='absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
										opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
										 bg-red-600 text-white rounded-full'
                                onClick={scrollRight}
                            />
                            <ChevronLeft
                                className='absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 
								group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 
								text-white rounded-full'
                                onClick={scrollLeft}
                            />
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default WatchPage

