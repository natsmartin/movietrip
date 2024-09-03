import React from 'react'

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

export default function Details({response} : {response: Movie}) {
    return (
        <>
            <h1 className='font-bold text-xl text-center mb-4 md:text-left md:text-3xl'>
                {response.Title}({response.Year})
            </h1>
            <h2 className='text-sm text-center md:text-left md:text-xl'>IMDb Rating&nbsp;
                <span className='font-bold'>
                    {response.Ratings[0]?.Value}
                </span>
            </h2>
            <h2 className='text-sm text-center md:text-left md:text-xl'>{response.Ratings[1]?.Source}&nbsp;
                <span className='font-bold'>
                    {response.Ratings[1]?.Value}
                </span>
            </h2>
            <h2 className='text-sm text-center md:text-left md:text-xl'>Rated&nbsp;
                <span className='font-bold'>
                    {response.Rated}
                </span>
            </h2>
            <p className='text-xs text-center md:text-left'>Runtime: <span className='font-bold'>{response.Runtime}</span></p>
            <p className='text-xs text-center md:text-left'>Released Date: <span className='font-bold'>{response.Released}</span></p>
            <br></br>
            <p className='text-xs md:text-base'><span className='font-bold'>Director: </span>{response.Director}</p>
            <p className='text-xs md:text-base'><span className='font-bold'>Writer: </span>{response.Writer}</p>
            <p className='text-xs md:text-base'><span className='font-bold'>Actors: </span>{response.Actors}</p>
            <p className='text-xs md:text-base'><span className='font-bold'>Genre: </span>{response.Genre}</p>
            <p className='text-xs md:w-1/2 md:text-base'><span className='font-bold'>Plot: </span>{response.Plot}</p>
        </>
    )
}
