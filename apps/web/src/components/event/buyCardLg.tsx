'use client'

import Link from "next/link";
import { IoTicket } from "react-icons/io5";

interface BuyCardLgProps {
  ticketCount: number
}

export default function BuyCardLg({ ticketCount }: BuyCardLgProps) {

  return (
    <>
      <div className="card shadow-none rounded-none justify-center lg:rounded-lg w-full bg-base-100 lg:shadow-xl">
        <div className="card-body p-3 lg:p-8 gap-5 justify-center lg:max-w-[375px] lg:max-h-[375px]">
          <div className="flex flex-nowrap justify-center items-center gap-3">
            <div>
                <IoTicket className="text-4xl text-biru"/>
            </div>
            <div>
                {ticketCount === 0 ? (
                  <p className="text-justify">Kamu belum memilih tiket. Silakan pilih lebih dulu di tab menu TIKET.</p>
                ) : (
                  <p className="text-justify">Anda telah memilih {ticketCount} tiket.</p>
                )}
            </div>
          </div>
          <div className="card-actions flex flex-nowrap gap-4">
            <hr />
            <div className="flex flex-col w-full gap-5">
                <div className="flex justify-between">
                    <p className=" text-nowrap">Harga mulai dari</p>
                    <p className="text-end font-bold text-nowrap">Rp 289000</p>
                </div>
                <div className="flex w-full justify-center btn text-lg bg-biru text-putih font-normal">
                    <Link href={''}>beli tiket</Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
