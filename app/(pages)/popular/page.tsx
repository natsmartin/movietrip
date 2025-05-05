'use client'

import React, { useState, useEffect } from "react";
import { fetchMovieList } from "@utils/actions/fetch-data";
import MovieList from "@app/sections/MovieList/MovieList";

const Popular = () => {
  const [popular, setPopular] = useState();

  useEffect(() => {
    const getPopular = async () => {
      const response = await fetchMovieList('popular');
      setPopular(response.results)
    }

    getPopular();
  }, []);

  return (
    <div className="flex min-h-screen flex-col justify-evenly md:items-center pt-8 md:p-16">
      <MovieList movieList={popular} />
    </div>
  );
};

export default Popular;
