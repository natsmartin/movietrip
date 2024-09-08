

import Image from "next/image";
import Details from '../Details/Details';


interface Movie {
    Title: string;
    Year: string;
    Ratings: Array<Rating>;
    Rated: string;
    Released: string;
    Plot: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Runtime: string;
}

interface Rating {
    Source: string;
    Value: string;
}


export default async function MovieBox({ movie }: { movie: Movie | any }) {



    if (!movie || movie.Error) {
        return (
            <div className='flex md:min-h-10 justify-center md:items-center'>
                <p>{movie?.Error}</p>
            </div>
        )
    }


    return (

        <div className='flex flex-col min-h-50% md:flex-row items-center md:justify-end'>
            <div className='w-1/2 md:w-auto m-0 md:m-4'>
                <Image
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://demofree.sirv.com/nope-not-here.jpg'}
                    alt={movie.Title}
                    width={300}
                    height={440}
                    priority={true} />
            </div>
            <div className='flex flex-col w-full m-4 px-16 md:p-0 md:w-1/2'>
                <Details response={movie} />
            </div>
        </div>
    )
}