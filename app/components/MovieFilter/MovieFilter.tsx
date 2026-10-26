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
  const [genres, setGenres] = useState<Array<GenreType>>([]);
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
      setList(response?.results ?? []);
      setIsLoading(false);
      setTotalPage(response?.total_pages ?? 0);
    };

    const getGenres = async () => {
      const response = await fetchGenres();
      setGenres((response?.genres ?? []) as GenreType[]);
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

      setTotalPage(response?.total_pages ?? 0);

      if (btnTextContent === "Search") {
        setList(response?.results ?? []);
      } else if (btnTextContent === "Load More") {
        setList((prev: Array<MyObject>) => [
          ...prev,
          ...(response?.results ?? []),
        ]);
      }
    };

    setPage((prev) => prev + 1);

    getMoviesWithGenre();

    setIsDisabled(true);
  };

  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4 px-3 pt-4 sm:px-5 md:flex-row md:items-start md:gap-6 md:px-8 md:pt-8">
      {sort ? (
        <aside className="flex w-full shrink-0 flex-col rounded-md bg-white px-4 py-3 text-black md:sticky md:top-4 md:w-60 md:px-5 md:py-4">
          <label className="m-2 font-bold">Genres</label>
          <FormGroup
            style={{ display: "grid" }}
            className="grid max-h-48 grid-cols-2 overflow-y-auto px-1 sm:grid-cols-3 md:max-h-[calc(100vh-12rem)] md:grid-cols-1 [&_.MuiFormControlLabel-root]:m-0 [&_.MuiFormControlLabel-root]:min-w-0 [&_.MuiFormControlLabel-label]:break-words"
          >
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
        </aside>
      ) : null}
      <section className="flex w-full min-w-0 flex-1 flex-col items-center overflow-visible">
        <h1 className="title w-full break-words py-4 font-bold">
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
      </section>
    </div>
  );
};

export default MovieFilter;
