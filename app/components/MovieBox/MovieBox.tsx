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
        return (
            <div className='flex md:min-h-10 justify-center md:items-center'>
                <h1>Loading...</h1>
            </div>
        )
    }

    if (response === null || response.Error) {
        return (
            <div className='flex md:min-h-10 justify-center md:items-center'>
                <h1>{response?.Error}</h1>
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