'use client'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchMovie } from '@/app/redux/slice/todo'
import { store } from '@/app/redux/store'

type AppDispatch = typeof store.dispatch;

export default function Search() {
    const [title, setTitle] = useState<string>('')
    const [year, setYear] = useState<any>()
    const [modal, setModal] = useState<string>('hidden')

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const onSearch = () => {
        const titleInput: any = document.getElementById('title-input')
        if (titleInput.value) {
            dispatch(fetchMovie({ title: title, year: year }))
        } else {
            setModal('block')
        }
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

            <div className={`${modal} fixed bg-[#0006] z-10 top-0 left-1/2
            -translate-x-1/2 overflow-auto h-full w-full`}>
                <div className='p-4 m-4 bg-white w-auto text-center md:w-2/6 md:translate-x-full'>
                    <span onClick={() => setModal('hidden')}
                        className='text-gray-500 top-0 float-right font-bold text-2xl hover:cursor-pointer'>x</span>
                    <p className='m-6'>Please enter a movie title.</p>
                </div>
            </div>

            <input id='title-input' value={title} type='text'
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
