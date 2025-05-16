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
        prev.filter((genre) => genre !== value)
      );
    }

    setPage(1);
  };

  const handleClick = (e: React.MouseEvent) => {
    const btnTextContent = e.currentTarget.textContent;

    const params = selectedGenres.toString().replaceAll(",", "%2C");

    const getMoviesWithGenre = async () => {
      const response = await fetchMoviesWithGenre(params, sort, page);

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
    <div className="flex flex-col min-h-screen justify-start pt-4 md:pt-8">
      {sort ? (
        <div className="flex flex-col items-center px-12 py-4 bg-white border-black border-y-2">
          <label className="w-[75vw] font-bold ">Genres</label>
          <FormGroup
            className="px-2 md:px-12 w-[80vw] [&_span]:text-xs md:[&_span]:text-base"
            style={{ flexDirection: "row" }}
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
            disabled={isDisabled}
            variant="contained"
            style={{ width: "fit-content" }}
            onClick={handleClick}
          >
            Search
          </Button>
        </div>
      ) : null}

      <div className="flex flex-col py-4 md:py-8">
        <h1 className="title flex justify-center font-bold">{heading}</h1>

        <Suspense fallback={<Loading />}>
          <MovieList movieList={list} />
          {(page < totalPage) && list.length !== 0 ? (
            <Button
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
