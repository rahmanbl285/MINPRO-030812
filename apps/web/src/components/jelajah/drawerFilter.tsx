'use client'

import Link from 'next/link';
import { IoReload } from 'react-icons/io5';
import AccordionFilter from './accordion';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { IEvent } from '@/types/event';

const ITEMS_PER_PAGE = 5

export default function DrawerFilter() {
  const [events, setEvents] = useState<IEvent[]>([])
  const [filters, setFilters] = useState({
    eventLocation: '',
    eventCategory: '',
    search: ''
  })
  const [currentPage, setCurrentPage] = useState(1)

  const [text, setText] = useState('')
  const [value] = useDebounce(text, 1000)

  useEffect(() => {
    console.log(text);
    setFilters((prevFilters) => ({ ...prevFilters, search: value }))
  }, [value])

  useEffect(() => {
    fetchData()
  }, [filters])

  const fetchData = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`http://localhost:8000/api/events?${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch events');
      }

      const responseData = await res.json();
      console.log('Fetched events:', responseData.event); // Debug log
      setEvents(responseData.event);
    } catch (err) {
        console.log(err);
        
    }
  }

  const handleFilterChange = (e: any) => {
    const { eventTitle, value } = e.target;
    setFilters({
      ...filters,
      [eventTitle]: value,
    });
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexofFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentEvents = events.slice(indexofFirstItem, indexOfLastItem);
  
  

  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);
  

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
      console.log(text);
  }, [value])

  return (
    <div>
      <div className="drawer md:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-8 pt-28 w-80 min-h-full bg-putih text-biru">
            {/* Sidebar content here */}
            <li>
              <div className="inline-flex justify-between">
                <h4 className="font-bold text-lg">Filter</h4>
                <Link href={'/jelajah'}>
                  <IoReload className="text-lg font-bold" />
                </Link>
              </div>
            </li>
            <div>
            <form className="hidden md:inline w-[50%] px-10 mx-auto">   
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">

                        <input type="search" id="default-search" className="flex md:flex-shrink-0 md:flex-grow w-full p-4 ps-6 text-sm text-[#4B6587] border border-gray-300 rounded-full bg-putih " defaultValue={''} onChange={(e) => {
                            setText(e.target.value)
                        }} placeholder="Search Event" />
                        <button type="submit" className="text-putih absolute end-2.5 bottom-2.5 bg-[#4B6587] rounded-full text-xl px-4 py-2"><FaSearch /></button>
                    </div>
                </form>
        </div>
            <AccordionFilter/>
          </ul>
        </div>
      </div>
    </div>
  );
}
