'use client'

import React, { useState, useEffect, FormEvent, Suspense } from 'react'
import { fetchMovie } from '@app/utils/actions/fetch-data';
import MovieBox from "@sections/MovieBox/MovieBox"
import Loading from '@app/loading'

interface ParamsProps {
    title: FormDataEntryValue | null,
    year: number
}

export default function Search() {

    const [year, setYear] = useState()
    const [modal, setModal] = useState('hidden')

    const [params, setParams] = useState<ParamsProps>({ title: '', year: 0})
    const [movie, setMovie] = useState()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget)

        setParams({
            title: formData.get('title'),
            year: Number(formData.get('year')),
        })

    }

    useEffect(() => {

        async function fetchData() {
            const response = await fetchMovie(params)
            setMovie(response)
        }

        if (params.title) {
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

    const handleNumChange = ({ target }: { target: any }) => {
        let { value } = target
        setYear(value)
    }

    const arrYear = []

    for (let i = 1950; i <= new Date().getFullYear(); i++) {
        arrYear.push(i)
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
                <form onSubmit={handleSubmit} className='flex flex-col w-full md:w-[950px] justify-center items-center md:flex md:flex-row'>
                    <div className='flex justify-center md:justify-end w-[70%] md:w-[25vw]'>
                        <input id='title-input' type='text' name='title' required
                            className={`input-title-clamp dark:text-black rounded p-1 text-xs m-2 md:mx-4 md:text-base`}
                            placeholder='Search for title' maxLength={100}
                        >
                        </input>
                    </div>
                    <div className='flex items-center'>
                        <label htmlFor='year' className='text-sm md:text-base'> Year: </label>
                        <select value={year || ''} name='year'
                            className={`input-year-clamp dark:text-black text-center rounded p-1 m-2 text-xs md:text-base md:mx-4`}
                            onChange={handleNumChange}
                        >
                            <option selected value=''> </option>
                            {
                                arrYear.reverse().map((year, index) => <option key={index} value={year}>{year}</option>)
                            }
                        </select>
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
                <MovieBox movie={movie} />
            </Suspense>
        </>

    )
}
