import React, { useEffect, useState } from 'react'
import { useContentStore } from '../store/content'
import axios from 'axios'

const useGetTrendingContent = () => {
    const [trendingContent, setTrendingContent] = useState(null)
    const { contentType } = useContentStore()

    useEffect(() => {
        const getTrendingContent = async () => {
            const response = await axios.get(`/api/${contentType}/trending`)
            setTrendingContent(response.data)
            console.log("Trending content", response.data);
            
        }

        getTrendingContent();
    }, [contentType])


    return {trendingContent}
}

export default useGetTrendingContent