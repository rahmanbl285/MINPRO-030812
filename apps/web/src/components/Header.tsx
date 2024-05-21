'use client'

import Link from "next/link";
import { useState } from "react";
import { MdDateRange, MdOutlineExplore } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import SearchBarMd from "./home/searchBar";

export const Header = () => {

  
  const [isClickBurger, setisClickBurger] = useState(false);

  const toggleNavbar = () => {
      setisClickBurger(!isClickBurger)
      console.log(isClickBurger)
  }


  return (
    <div className="fixed bg-biru z-50 w-full">

        <div className="mx-auto">
            <div className="flex items-center justify-between h-20">

                {/* LOGO */}
                <div className="flex items-center">
                    <div className="flex-shrink-0 ml-9">
                        <Link href={'/'}
                            className="tracking-[0.4em] text-putih font-bold"
                            >EVENT
                        </Link>  
                    </div>
                </div>

                {/* SEARCH BAR MD */}
                {/* <SearchBarMd/> */}

                {/* MENU MD */}
                <div className="hidden md:block pr-4">
                    <div className="flex items-center space-x-8 text-sm text-putih">
                        <Link href={'/events/create-event'} className="font-bold flex text-nowrap gap-1"><MdDateRange className="inline text-xl"/>BUAT EVENT</Link>
                        <Link href={'/jelajah'} className="font-bold flex gap-1"><MdOutlineExplore className="text-xl inline"/>JELAJAH</Link>
                        <Link href={'/register'}>DAFTAR</Link>
                        <Link href={'/login'}>MASUK</Link>
                    </div>
                </div>

                <div className="md:hidden flex items-center gap-1 pr-3">
                    {/* SEARCH SM*/}
                    {/* <button className="btn bg-biru border-0 shadow-none text-putih text-xl" onClick={()=>(document.getElementById('my_modal_2') as HTMLFormElement).showModal()}><FaSearch/></button>
                    <dialog id="my_modal_2" className="modal backdrop-blur-[2px]">
                    
                    <div className="modal-box w-full h-fit">
                        <form className="mx-auto">   
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <input type="search" id="default-search" className="flex md:flex-shrink-0 md:flex-grow w-full p-4 ps-6 text-sm text-biru border border-gray-300 rounded-full bg-putih " placeholder="Search Event" />
                                <button type="submit" className="text-putih absolute end-2.5 bottom-2.5 bg-biru rounded-full text-xl px-4 py-2"><FaSearch /></button>
                            </div>
                        </form>
                    </div> */}

                    {/* <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                    </dialog> */}

                    {/* BURGER */}
                    <button 
                        onClick={toggleNavbar}
                        className="inline-flex items-center relative justify-center p-2 rounded-md text-putih hover:text-putih focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#ececec]"
                    >
                        {isClickBurger ? (
                            <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        ) : (
                            <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                    </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>

        { isClickBurger && (
            <div className="md:hidden p-4">
                <div className="block px-2 pt-2 pb-3 text-sm space-y-2 sm:px-3 font-semibold text-putih bg-[#4B6587]">
                    <div className="flex w-full gap-4 justify-evenly text-center">
                        <Link href={'/register'} className="bg-putih text-biru border-[1px] py-2 w-1/2 rounded-lg ">DAFTAR</Link>
                        <Link href={'/login'} className="bg-putih text-biru border-[1px] py-2 w-1/2 rounded-lg">MASUK</Link>
                    </div>
                    <div className="pt-5 flex flex-col gap-3">
                        <Link href={'/events/create-event'} className="block">BUAT EVENT</Link>
                        <Link href={'/jelajah'} className="block">JELAJAH</Link>
                    </div>
                    
                </div>
            </div>
        )}

    </div>
  )
};