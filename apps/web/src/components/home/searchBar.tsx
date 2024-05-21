'use client'

import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from 'use-debounce'

export default function SearchBarMd () {
    const [text, setText] = useState('Hello')
    const [value] = useDebounce(text, 1000)

    useEffect(() => {
        console.log(text);
    }, [value])
    return (
        <div>
            <form className="hidden md:inline w-[50%] px-10 mx-auto">   
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">

                        <input type="search" id="default-search" className="flex md:flex-shrink-0 md:flex-grow w-full p-4 ps-6 text-sm text-[#4B6587] border border-gray-300 rounded-full bg-putih " defaultValue={'Hello'} onChange={(e) => {
                            setText(e.target.value)
                        }} placeholder="Search Event" />
                        <button type="submit" className="text-putih absolute end-2.5 bottom-2.5 bg-[#4B6587] rounded-full text-xl px-4 py-2"><FaSearch /></button>
                    </div>
                </form>
        </div>
    )
}