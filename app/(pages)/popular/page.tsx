import React from "react";
import MovieFilter from "@app/components/MovieFilter/MovieFilter";

const Popular = () => {

  return (
    <MovieFilter filter={"popular"} heading={"Popular Movies"}/>
  );
};

export default Popular;
