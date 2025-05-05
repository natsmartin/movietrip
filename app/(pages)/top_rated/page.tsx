'use client'

import MovieList from '@app/sections/MovieList/MovieList';
import { fetchMovieList } from '@app/utils/actions/fetch-data';
import React, { useEffect, useState } from 'react'

const TopRated = () => {

  const [topRated, setTopRated] = useState();
  
    useEffect(() => {
      const getTopRated = async () => {
        const response = await fetchMovieList('top_rated');
        setTopRated(response.results)
      }
  
      getTopRated();
    }, []);

  return (
    <div className="flex min-h-screen flex-col justify-evenly md:items-center pt-8 md:p-16">
      <MovieList movieList={topRated} />
    </div>
  )
}

export default TopRated