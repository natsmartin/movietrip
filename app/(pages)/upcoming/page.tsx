'use client'

import MovieList from '@app/sections/MovieList/MovieList';
import { fetchMovieList } from '@app/utils/actions/fetch-data';
import React, { useEffect, useState } from 'react'

const Upcoming = () => {

  const [upcoming, setUpcoming] = useState();
    
      useEffect(() => {
        const getUpcoming = async () => {
          const response = await fetchMovieList('upcoming');
          setUpcoming(response.results)
        }
    
        getUpcoming();
      }, []);
  return (
    <div className="flex min-h-screen flex-col justify-evenly md:items-center pt-8 md:p-16">
      <MovieList movieList={upcoming} label={'Upcoming Movies'}/>
    </div>
  );
};

export default Upcoming;
