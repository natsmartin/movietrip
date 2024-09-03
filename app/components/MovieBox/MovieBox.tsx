'use client'
import React from 'react'
import Image from "next/image";
import Details from '@/components/Details/Details';
import { useSelector } from 'react-redux';
import { Response } from '@/app/redux/slice/todo';


export default function MovieBox() {
    const state: any = useSelector((state: Response) => state.fetchMovie)
    const response = state.data

    if (state.isLoading) {
        return <div className='flex md:min-h-10 justify-center md:items-center'><h1>Loading...</h1></div>
    }

    if (response === null || response.Error) {
        return <div className='flex md:min-h-10 justify-center md:items-center'><h1>{response?.Error || null}</h1></div>
    }

    return (

        <div className='flex flex-col max-h-50% md:flex-row md:justify-end md:m-8'>
            <div className='w-full m-4 md:w-auto'>
                <Image
                    src={response.Poster !== 'N/A' ? response.Poster : 'https://demofree.sirv.com/nope-not-here.jpg'}
                    alt={response.Title}
                    width={300}
                    height={440} />
            </div>
            <div className='w-full m-4 md:w-1/2'>
                <Details response={response} />
            </div>
        </div>
    )
}