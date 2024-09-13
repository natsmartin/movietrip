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

export default function Details({ response }: { response: Movie }) {

    const splitRating = (rating: string): string[] => rating.split('/')
    const splitPercent = (rating: string): string[] => rating.split('%')
    const colorStatus = (rating: string) => {
        if (splitRating(rating)[1]) {
            if ((Number(splitRating(rating)[0]) / Number(splitRating(rating)[1])) * 100 > 50) {
                return 'text-green-700'
            }
            return 'text-red-700'
        }

        if (Number(splitPercent(rating)[0]) > 50) {
            return 'text-green-700'
        }
        return 'text-red-700'

    }

    return (
        <>
            <h1 className='font-bold text-center mb-4 md:text-left heading1'>
                {response.Title}({response.Year})
            </h1>
            {response.Ratings && response.Ratings[0] ?
                (
                    <h2 className='heading2 pl-[2rem] md:pl-0'>IMDb Rating⭐&nbsp;
                        <span className={`font-bold ${colorStatus(response.Ratings[0].Value)}`}>
                            {splitRating(response.Ratings[0].Value)[0]}
                        </span>
                        <span className='font-bold'>
                            /{splitRating(response.Ratings[0].Value)[1]}
                        </span>
                    </h2>
                ) : <h2 className='heading2 pl-[2rem] md:pl-0'>N/A⭐</h2>
            }


            {
                response.Ratings && response.Ratings[1] ?
                    <h2 className='heading2 pl-[2rem] md:pl-0'>{response.Ratings[1].Source}🍅&nbsp;
                        <span className={`font-bold ${colorStatus(response.Ratings[1].Value)}`} >
                            {splitPercent(response.Ratings[1].Value)[0]}%
                        </span>
                    </h2> : <h2 className='heading2 pl-[2rem] md:pl-0'>N/A🍅</h2>
            }

            <h2 className='heading2 pl-[2rem] md:pl-0'>Rated&nbsp;
                <span className='font-bold'>
                    {response.Rated}
                </span>
            </h2>
            <p className='text-xs px-8 md:p-0'>Runtime: <span className='font-bold'>{response.Runtime}</span></p>
            <p className='text-xs pl-8 md:p-0'>Released Date: <span className='font-bold'>{response.Released}</span></p>
            <br></br>
            <p className='normal-text'><span className='font-bold'>Director: </span>{response.Director}</p>
            <p className='normal-text'><span className='font-bold'>Writer: </span>{response.Writer}</p>
            <p className='normal-text'><span className='font-bold'>Actors: </span>{response.Actors}</p>
            <p className='normal-text'><span className='font-bold'>Genre: </span>{response.Genre}</p>
            <p className='normal-text md:w-1/2'><span className='font-bold'>Plot: </span>{response.Plot}</p>
        </>
    )
}
