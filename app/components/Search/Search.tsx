"use client";

import React, { useState, useEffect, FormEvent, Suspense } from "react";
import {
  fetchMovie,
  MyObject,
  ParamsProps,
} from "@app/utils/actions/fetch-data";
import MovieList from "@sections/MovieList/MovieList";
import Loading from "@app/loading";
import { Button } from "@mui/material";

export default function Search() {
  const [modal, setModal] = useState("hidden");

  const [params, setParams] = useState<ParamsProps>({ movieTitle: "" });
  const [movieList, setMovieList] = useState<Array<MyObject>>([]);
  const [totalPage, setTotalPage] = useState(10);
  const [page, setPage] = useState(1);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    setParams({
      movieTitle: formData.get("title"),
    });

    setPage(1);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetchMovie(params, page);
      setMovieList(response.results);
      setTotalPage(response.total_pages);
    }

    if (params.movieTitle && page === 1) {
      fetchData();
    }
  }, [page, params]);

  const handleClick = () => {
    const fetchData = async () => {
      const response = await fetchMovie(params, page + 1);
      setMovieList((prev: Array<MyObject>) => [...prev, ...response.results]);
      setTotalPage(response.total_pages);
    };

    setPage((prev) => prev + 1);

    fetchData();
  };

  const onSearch = () => {
    const titleInput: any = document.getElementById("title-input");
    if (!titleInput.value) {
      setModal("block");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center md:w-full m-2 p-2 md:p-8 md:flex md:flex-row md:m-8">
        <div
          className={`${modal} fixed bg-[#0006] z-10 top-0 left-1/2
                    -translate-x-1/2 overflow-auto h-full w-full`}
        >
          <div className="p-4 m-4 bg-white w-auto text-center md:w-2/6 md:translate-x-full">
            <span
              onClick={() => setModal("hidden")}
              className="text-gray-500 top-0 float-right font-bold text-2xl hover:cursor-pointer"
            >
              x
            </span>
            <p className="m-6">Please enter a movie title.</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full justify-center items-center"
        >
          <div className="flex justify-center w-[80vw] md:w-[620px]">
            <input
              id="title-input"
              type="text"
              name="title"
              required
              className="input-title-clamp dark:text-black rounded p-1 text-xs m-2 md:mx-4 md:text-base"
              placeholder="Search for title"
              maxLength={100}
            ></input>
            <button
              type="submit"
              className="text-white bg-gray-800 hover:bg-gray-900 m-2
                        focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs px-4 py-2 md:text-base md:ml-2
                        dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={onSearch}
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <Suspense fallback={<Loading />}>
        <MovieList movieList={movieList} />
        {page < totalPage && movieList.length !== 0 ? (
          <Button
            style={{ margin: "1rem" }}
            className="w-fit self-center"
            variant="contained"
            onClick={handleClick}
          >
            Load More
          </Button>
        ) : null}
      </Suspense>
    </>
  );
}
