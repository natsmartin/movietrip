"use client";

import Loading from "@app/loading";
import MovieList from "@app/sections/MovieList/MovieList";
import {
  fetchGenres,
  fetchMovieList,
  fetchMoviesWithGenre,
  MyObject,
} from "@app/utils/actions/fetch-data";
import React, { Suspense, useEffect, useState } from "react";
import { FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material";

const MovieFilter = ({
  filter,
  heading,
  sort,
}: {
  filter: string;
  heading: string;
  sort: string;
}) => {
  const [list, setList] = useState<Array<MyObject>>([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [selectedGenres, setSelectedGenres] = useState<Array<string>>([]);

  const [isDisabled, setIsDisabled] = useState(true);

  interface GenreType {
    id: number;
    name: string;
  }

  useEffect(() => {
    const getMovieList = async () => {
      const response = await fetchMovieList(filter);
      setList(response.results);
      setIsLoading(false);
      setTotalPage(response.total_pages);
    };

    const getGenres = async () => {
      const response = await fetchGenres();
      setGenres(response.genres);
    };

    getMovieList();
    getGenres();
  }, [filter]);

  useEffect(() => {
    setIsDisabled(selectedGenres.length === 0);
  }, [selectedGenres.length]);

  const handleChange = (e: React.ChangeEvent, checked: boolean) => {
    const value = (e.target as HTMLInputElement).value;
    if (checked) {
      setSelectedGenres((prev: Array<string>) => [...prev, value]);
    } else {
      setSelectedGenres((prev: Array<string>) =>
        prev.filter((genre) => genre !== value),
      );
    }

    setPage(1);
  };

  const handleClick = (e: React.MouseEvent) => {
    const btnTextContent = e.currentTarget.textContent;

    const params = selectedGenres.toString().replaceAll(",", "%2C");

    const getMoviesWithGenre = async () => {
      const response = await fetchMoviesWithGenre(
        params,
        sort,
        selectedGenres.length === 0 ? page + 1 : page,
      );

      setTotalPage(response.total_pages);

      if (btnTextContent === "Search") {
        setList(response.results);
      } else if (btnTextContent === "Load More") {
        setList((prev: Array<MyObject>) => [...prev, ...response.results]);
      }
    };

    setPage((prev) => prev + 1);

    getMoviesWithGenre();

    setIsDisabled(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-start gap-6 pt-4 md:pt-8">
      {sort ? (
        <div className="flex flex-col text-black px-5 py-4 bg-white md:w-64">
          <label className="font-bold m-2">Genres</label>
          <FormGroup className="px-2 [&_span]:py-0 [&_span]:text-[10px] md:[&_span]:text-base md:[&_span]:py-2">
            {genres?.map((genre: GenreType, index: number) => (
              <FormControlLabel
                key={index}
                control={<Checkbox onChange={handleChange} value={genre.id} />}
                label={genre.name}
              ></FormControlLabel>
            ))}
          </FormGroup>
          <Button
            className="w-fit self-center"
            disabled={isDisabled}
            variant="contained"
            style={{ width: "fit-content", margin: "1rem" }}
            onClick={handleClick}
          >
            Search
          </Button>
        </div>
      ) : null}

      <div className="flex flex-col items-start m-2 w-full md:flex-1 overflow-visible">
        <h1 className="title flex justify-start w-full font-bold px-6 py-4">
          {heading}
        </h1>

        <Suspense fallback={<Loading />}>
          <MovieList movieList={list} isLoading={isLoading} />
          {page < totalPage && list.length !== 0 ? (
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
      </div>
    </div>
  );
};

export default MovieFilter;
