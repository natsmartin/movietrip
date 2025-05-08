"use client";

import Loading from "@app/loading";
import MovieList from "@app/sections/MovieList/MovieList";
import { fetchMovieList } from "@app/utils/actions/fetch-data";
import React, { Suspense, useEffect, useState } from "react";

const MovieFilter = ({ filter, heading }: { filter: string; heading: string }) => {

 const [list, setList] = useState();

  useEffect(() => {
    const getMovieList = async () => {
      const response = await fetchMovieList(filter);
      setList(response.results);
    };

    getMovieList();
  }, [filter]);

  return (
    <div className="flex min-h-screen flex-col justify-center md:items-center pt-8 md:p-16">
      <h1 className="title flex items-start w-[90vw] font-bold md:w-[850px] pl-[5vw] md:pl-0">
        {heading}
      </h1>

      <Suspense fallback={<Loading />}>
        <MovieList movieList={list} />
      </Suspense>
    </div>
  )
}

export default MovieFilter