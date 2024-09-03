'use client'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchMovie } from '@/app/redux/slice/todo'
import { store } from '@/app/redux/store'

type AppDispatch = typeof store.dispatch;

export default function Search() {
    const [title, setTitle] = useState<string>('')
    const [year, setYear] = useState<any>()

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const onSearch = () => {
        dispatch(fetchMovie({ title: title, year: year }))
    }


    const handleTextChange = ({ target }: { target: any }) => {
        let { value } = target
        setTitle(value)
    }

    const handleNumChange = ({ target }: { target: any }) => {
        let { value, min, max } = target
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));
        setYear(value)
    }

    return (
        <div className='flex flex-col items-center m-8 md:flex md:flex-row md:m-4'>
            <input value={title} type='text'
                className={`md:w-full rounded p-1 text-xs m-2 md:mx-4 md:text-base`}
                placeholder='Search for title' maxLength={100}
                onChange={handleTextChange} >
            </input>
            <input value={year || ''} type='number'
                className={`w-1/4 text-center md:w-2/6 rounded p-1 text-xs m-2 md:mx-4 md:text-base`}
                placeholder='Year' max={new Date().getFullYear()}
                onChange={handleNumChange} >
            </input>
            <button type='button'
                className={`text-white bg-gray-800 hover:bg-gray-900 m-2
                focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:ml-2
                dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}
                onClick={onSearch} >
                Search
            </button>
        </div>

    )
}
