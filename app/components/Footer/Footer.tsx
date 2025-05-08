import React from 'react'

export default function Footer() {
    return (
        <footer className='min-h-24 flex justify-center items-center w-full text-xs 
         md:text-base'>
            &copy; {new Date().getFullYear()} MovieTrip
        </footer>
    )
}
