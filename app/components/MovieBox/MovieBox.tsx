import React from 'react'
import response from '@/dummy.json'
import Image from "next/image";
import Details from '@/components/Details/Details';

export default function MovieBox() {
    return (
        <div className='flex flex-col md:flex-row md:justify-center md:m-8'>
            <div className='w-full m-4 md:w-auto'>
                <Image
                    src={response.Poster} alt={response.Title}
                    width={300}
                    height={650} />
            </div>
            <div className='w-full m-4 md:w-1/2'>
                <Details response={response}/>
            </div>
        </div>
    )
}