import React from "react";
import MovieFilter from "@app/components/MovieFilter/MovieFilter";

const Upcoming = () => {

  return (
    <MovieFilter filter={"upcoming"} heading={"Upcoming Movies"} sort={""}/>
  );
};

export default Upcoming;
