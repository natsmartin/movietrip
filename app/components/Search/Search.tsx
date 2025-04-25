'use client'

import React, { useState, useEffect, FormEvent, Suspense } from 'react'
import { fetchMovie } from '@app/utils/actions/fetch-data';
import MovieList from '@sections/MovieList/MovieList';
import Loading from '@app/loading'

interface ParamsProps {
    movieTitle: FormDataEntryValue | null,
}


export default function Search() {

    const [modal, setModal] = useState('hidden')

    const [params, setParams] = useState<ParamsProps>({ movieTitle: ''})
    const [movieList, setMovieList] = useState()

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget)

        setParams({
            movieTitle: formData.get('title'),
        })

    }

    useEffect(() => {

        async function fetchData() {
            const response = await fetchMovie(params)
            setMovieList(response.results)
        }

        if (params.movieTitle) {
            fetchData()
        }
    }, [params])

    const onSearch = () => {
        const titleInput: any = document.getElementById('title-input')
        if (titleInput.value) {
        } else {
            setModal('block')
        }
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center md:w-full m-2 p-2 md:p-8 md:flex md:flex-row md:m-8'>

                <div className={`${modal} fixed bg-[#0006] z-10 top-0 left-1/2
                    -translate-x-1/2 overflow-auto h-full w-full`}>
                    <div className='p-4 m-4 bg-white w-auto text-center md:w-2/6 md:translate-x-full'>
                        <span onClick={() => setModal('hidden')}
                            className='text-gray-500 top-0 float-right font-bold text-2xl hover:cursor-pointer'>x</span>
                        <p className='m-6'>Please enter a movie title.</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col w-full justify-center items-center'>
                    <div className='md:flex contents justify-center w-fit lg:w-[50%]'>
                        <input id='title-input' type='text' name='title' required
                            className='input-title-clamp dark:text-black rounded p-1 text-xs m-2 md:mx-4 md:text-base'
                            placeholder='Search for title' maxLength={100}
                        >
                        </input>
                        <button type='submit' className='text-white bg-gray-800 hover:bg-gray-900 m-2
                        focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs px-4 py-2 md:text-base md:ml-2
                        dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
                            onClick={onSearch} >
                            Search
                        </button>
                    </div>
                </form>
            </div>
            <Suspense fallback={<Loading />} >
                <MovieList movieList={movieList} />
            </Suspense>
        </>

    )
}
