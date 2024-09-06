
import React from 'react'
import Image from "next/image";
import Details from '@components/Details/Details';


export default function MovieBox({movie}: {movie: any}) {

    const response = movie.data

    if (!response || response.Error) {
        return (
            <div className='flex md:min-h-10 justify-center md:items-center'>
                <p>{response?.Error}</p>
            </div>
        )
    }


    return (

        <div className='flex flex-col min-h-50% md:flex-row items-center md:justify-end'>
            <div className='w-1/2 md:w-auto m-0 md:m-4'>
                <Image
                    src={response.Poster !== 'N/A' ? response.Poster : 'https://demofree.sirv.com/nope-not-here.jpg'}
                    alt={response.Title}
                    width={300}
                    height={440} />
            </div>
            <div className='flex flex-col w-full m-4 px-16 md:p-0 md:w-1/2'>
                <Details response={response} />
            </div>
        </div>
    )
}