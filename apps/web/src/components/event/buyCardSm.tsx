'use client'

import Link from "next/link";

interface BuyCardSmProps {
    ticketCount: number
}

export default function BuyCardSm ({ ticketCount }: BuyCardSmProps) {
    return (
        <>
        <div className="fixed z-[999] bottom-0 w-full h-fit p-2 bg-putih text-biru">
            <div className="flex justify-between w-full">
                <div className="flex flex-col pl-3 w-1/2">
                <div>
                {ticketCount === 0 ? (
                  <p>Harga mulai dari</p>
                ) : (
                  <p>Total {ticketCount} tiket.</p>
                )}
            </div>
                    
                    <p className="text-lg font-bold">Rp 298000</p>
                </div>
                <div className="flex px-10 justify-center btn text-md bg-biru text-putih font-normal">
                    <Link href={''}>beli tiket</Link>
                </div>
            </div>
        </div>
        </>
    )
}