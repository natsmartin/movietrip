'use client'

import { useFormState } from 'react-dom'
import React, { useState, useEffect, Suspense } from 'react'
import { handleSubmit, fetchMovie } from '@app/utils/actions/fetch-data';
import MovieBox from "@sections/MovieBox/MovieBox"
import Loading from '@app/loading'



export default function Search() {

    const [year, setYear] = useState()
    const [modal, setModal] = useState('hidden')

    const [formState, formAction] = useFormState(handleSubmit, { data: '' })
    const [movie, setMovie] = useState()


    useEffect(() => {
        const params = formState.data

        async function fetchData() {
            const response = await fetchMovie(params)
            setMovie(response)
        }

        if (params.title) {
            fetchData()
        }
    }, [formState.data])

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
            <div className='flex flex-col items-center md:w-full m-2 p-2 md:p-8 md:flex md:flex-row md:m-8'>

                <div className={`${modal} fixed bg-[#0006] z-10 top-0 left-1/2
                    -translate-x-1/2 overflow-auto h-full w-full`}>
                    <div className='p-4 m-4 bg-white w-auto text-center md:w-2/6 md:translate-x-full'>
                        <span onClick={() => setModal('hidden')}
                            className='text-gray-500 top-0 float-right font-bold text-2xl hover:cursor-pointer'>x</span>
                        <p className='m-6'>Please enter a movie title.</p>
                    </div>
                </div>
                <form action={formAction} className='input-title-clamp flex flex-col w-[60%] md:w-full justify-center items-center md:flex md:flex-row'>
                    <input id='title-input' type='text' name='title' required
                        className={`dark:text-black w-full md:w-1/2 rounded p-1 text-xs m-2 md:mx-4 md:text-base`}
                        placeholder='Search for title' maxLength={100}
                    >
                    </input>
                    <div className='flex items-center text-sm md:text-base'>
                        <label htmlFor='year'> Year: </label>
                        <select value={year || ''} name='year'
                            className={`input-year-clamp dark:text-black text-center rounded p-1 text-xs m-2 md:mx-4 md:text-base`}
                            onChange={handleNumChange}
                        >
                            <option selected value=''> </option>
                            {
                                arrYear.map((year, index) => <option key={index} value={year}>{year}</option>)
                            }
                        </select>
                    </div>
                    <button type='submit' className='text-white bg-gray-800 hover:bg-gray-900 m-2
                        focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:ml-2
                        dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
                        onClick={onSearch} >
                        Search
                    </button>
                </form>
            </div>
            <Suspense fallback={<Loading />} >
                <MovieBox movie={movie} />
            </Suspense>
        </>

    )
}
