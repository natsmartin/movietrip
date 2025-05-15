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
  const [list, setList] = useState();
  const [genres, setGenres] = useState([]);

  interface GenreType {
    id: number;
    name: string;
  }

  useEffect(() => {
    const getMovieList = async () => {
      const response = await fetchMovieList(filter);
      setList(response.results);
    };

    const getGenres = async () => {
      const response = await fetchGenres();
      setGenres(response.genres);
    };

    getMovieList();
    getGenres();
  }, [filter]);

  let selectedGenres: string[] = [];

  const handleChange = (e: React.ChangeEvent, checked: boolean) => {
    const value = (e.target as HTMLInputElement).value;
    if (checked) {
      selectedGenres.push(value);
    }
  };

  const handleClick = () => {
    const params = selectedGenres.toString().replaceAll(",", "%2C");
    const getMoviesWithGenre = async () => {
      const response = await fetchMoviesWithGenre(params, sort);
      setList(response.results);
      console.log(response);
    };

    getMoviesWithGenre();
  };

  return (
    <div className="flex flex-col min-h-screen justify-start pt-4 md:pt-8">
      {sort ? (
        <div className="flex flex-col px-12 py-4 bg-white border-black border-y-2">
          <label className="font-bold">Genres</label>
          <FormGroup
            className="px-12 w-[80vw]"
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
        </Suspense>
      </div>
    </div>
  );
};

export default MovieFilter;
