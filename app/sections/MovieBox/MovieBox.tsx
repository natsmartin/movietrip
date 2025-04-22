import Details from "../Details/Details";
import Link from "next/link";

export interface Movie {
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default function MovieBox({ movie }: { movie: Movie | any }) {
  if (!movie || movie.Error) {
    return (
      <div className="flex md:min-h-10 justify-center md:items-center">
        <p>{movie?.Error}</p>
      </div>
    );
  }

  return (
    <Link href={`/movie/${movie.id}`}>
    <div
      className="box flex w-[90vw] h-[145px] bg-white border-2 border-slate-500 rounded-md m-2 shadow-lg
        md:w-[65vw] hover:scale-105 transition-all cursor-pointer"
    >
      <Details response={movie} />
    </div>
    </Link>
  );
}
