import React from "react";
import MovieFilter from "@app/components/MovieFilter/MovieFilter";

const TopRated = () => {

  return (
    <MovieFilter filter={"top_rated"} heading={"Top Rated Movies"} sort={"vote_average.desc"}/>
  );
};

export default TopRated;
