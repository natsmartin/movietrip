"use server";

export interface MyObject {
  [key: string]: any;
}

const baseURL = "https://api.themoviedb.org/3";

export const fetchMovie = async ({
  movieTitle,
}: {
  movieTitle: FormDataEntryValue | null;
}) => {
  const response = await fetch(
    `${baseURL}/search/movie?api_key=${process.env.API_KEY}&query=${movieTitle}`
  );
  return await response.json();
};

export const fetchMovieDetails = async (id: string) => {
  const response = await fetch(
    `${baseURL}/movie/${id}?api_key=${process.env.API_KEY}`
  );
  return await response.json();
};

export const fetchMovieCredits = async (id: string) => {
  const response = await fetch(
    `${baseURL}/movie/${id}/credits?api_key=${process.env.API_KEY}`
  );
  return await response.json();
};

export const fetchMovieTrailer = async (id: string) => {
  const response = await fetch(
    `${baseURL}/movie/${id}/videos?api_key=${process.env.API_KEY}`
  );
  const json = await response.json();
  return await json.results.filter(
    (video: MyObject) => video.type === "Trailer" && video.site === "YouTube"
  );
};

export const fetchMovieList = async (filter: string) => {
  const response = await fetch(
    `${baseURL}/movie/${filter}?api_key=${process.env.API_KEY}`
  );
  return await response.json();
};
