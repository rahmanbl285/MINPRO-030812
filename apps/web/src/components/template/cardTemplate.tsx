'use client'

import { formatToIDR } from '@/helpers/formatPrice';
import { splitStr } from '@/helpers/splitStr';
import { iCardTemplate } from '@/types/cardTemplate';
import Image from 'next/image';
import Link from 'next/link';

interface EventCardProps {
  event: iCardTemplate
}

export const CardTemplate: React.FC<EventCardProps> = ({event}) => {
  return (
    <div className=" max-w-72 rounded shadow-lg bg-putih">
      <Link href={`/events/${event.eventSlug}`}>
      <Image
        className="w-full"
        src={event.eventImage}
        alt={event.eventTitle}
        width={250}
        height={100}
        priority
      />

      <div className='flex flex-col h-32 justify-center '>
        <div className="font-bold text-md px-4 pt-2 mb-2">
          {splitStr(event.eventTitle, 30)}
        </div>
        <div className="px-4 pb-4">
            <p className="text-gray-700 text-sm">{event.startDate}</p>
            <p className="font-bold mt-2 text-md">{formatToIDR(event.ticketPrice)}</p>
        </div>
      </div>
      </Link>

      {/* image */}
      <Link href={`/users/${event.linkProfile}`}>
      <hr className=" text-abu" />
      <div className="flex px-6 py-4 gap-3">
        <div className="h-12 w-12 px-6 relative">
          <Image
            src={event.profileImg}
            alt=''
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* bagian nama */}
        <div className="flex items-center">
          <h6 className="text-sm text-nowrap">hai guys</h6>
        </div>
      </div>
      </Link>
    </div>
  );
}
