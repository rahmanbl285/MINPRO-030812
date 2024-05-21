'use client';

// ticket.tsx
import Link from 'next/link';
import { useState } from 'react';
import { MdOutlineEventSeat } from 'react-icons/md';

interface TicketProps {
  onCountChange: (count: number) => void;
}

export default function Ticket({ onCountChange }: TicketProps) {
  const [count, setCount] = useState(0);

  const handleInc = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (count < 4) {
      const newCount = count + 1;
      setCount(newCount);
      onCountChange(newCount); // Panggil prop onCountChange dengan nilai baru
    } else {
      alert('Maksimal memesan 4 tiket!');
    }
  };

  const handleDec = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      onCountChange(newCount); // Panggil prop onCountChange dengan nilai baru
    }
  };

  return (
    <div className="flex flex-col w-full h-fit p-5 border gap-3">
      <div className="flex flex-col gap-2">
        <h6 className="text-md">
          <span className="font-bold uppercase">Journey in Harmony</span> -{' '}
          <span>29 May 2024</span>
        </h6>
        <p> price include tax and admin</p>
        <p className="inline-flex gap-1">
          <MdOutlineEventSeat className='text-xl'/>
          Available Seats: 0/60
        </p>
      </div>
      <div>
        <div className="flex flex-col gap-3">
          <hr />
          <div className="flex justify-between">
            <p className="font-bold py-1">Rp 292000</p>
            <div className="inline-flex">
              <Link
                href={''}
                onClick={handleDec}
                className="px-3  py-1 border rounded-full"
              >
                -
              </Link>

              <p className=" px-3 py-1">{count}</p>
              <Link
                href={''}
                onClick={handleInc}
                className="px-3  py-1 border rounded-full"
              >
                +
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
