import EventBreadCrumbs from '@/components/event/eventBreadCrumbs';
import SectionOne from '@/components/event/section1';
import SectionTwo from '@/components/event/section2';
import { formatToIDR } from '@/helpers/formatPrice';
import { getEvent, getEventSlug } from '@/lib/event';
import { IEvent } from '@/types/event';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { MdOutlineEventSeat } from 'react-icons/md';

export const revalidate = 3600

export const generateStaticParams = async () => {
  const data = await getEvent()

  return data.event?.map((event: IEvent) => ({
      params: {
          slug: event?.eventSlug
      }
  }))
}

export async function generateMetadata({ params }: { params: { slug: string }}) {
  const data = await getEventSlug(params.slug)
  console.log(data.events.eventTitle)

  return data.events.eventTitle
}

export default async function Event({ params }: { params: { slug: string }}) {
    const data = await getEventSlug(params.slug)
    console.log(data);
    

  return (
    <div className="flex flex-col w-screen h-fit bg-putih pt-20 lg:pt-24">
      <div className='flex flex-col gap-5'>
          <div className="flex flex-col lg:flex-row max-w-full gap-3 lg:gap-10 justify-center lg:px-2">
      <div className="flex flex-col-reverse lg:flex-col w-full h-auto lg:max-w-[720px] lg:max-h-[375px]">
      <div className="flex pt-4 lg:pt-0 px-4 lg:px-0">
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link href={'/'}>Home</Link>
          </li>
          <li>
            <Link href={'/jelajah'}>Kategori</Link>
          </li>
          <li>{data.events.eventTitle}</li>
        </ul>
      </div>
    </div>
        <div className='flex justify-center'>
          <Image
            src={data.events.eventImage}
            alt={data.events.eventTitle}
            width={1000}
            height={350}
          ></Image>
        </div>
      </div>
      <div className="flex">
      <div className="bg-putih card shadow-none rounded-none lg:rounded-lg w-full lg:shadow-xl">
        <div className="card-body p-3 lg:p-8 justify-center lg:max-w-[375px] lg:max-h-[375px] gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="card-title uppercase font-bold text-justify text-birutua">{data.events.eventTitle}</h2>
            <p className="inline-flex gap-3 text-birutua">
              <FaCalendarAlt className="text-lg text-biru opacity-65" /> {data.events.startDate}
            </p>
            <p className="inline-flex gap-3 text-birutua">
              <FaClock className="text-lg text-biru opacity-65" /> 19:00 - 21:00 WIB
            </p>
            <p className="inline-flex gap-3 text-birutua">
              <FaLocationDot className="text-lg text-biru opacity-65" />
              {data.events.eventLocation}
            </p>
          </div>
          <div className="card-actions flex-nowrap gap-4">
            <div className="h-16 w-16 max-h-16 min-w-16 relative">
              <Image
                src="https://ucarecdn.com/234780fb-0f82-4e2f-8f4c-81c0fcc7e537/-/format/auto/-/preview/3000x3000/-/quality/lighter/About%20Skin1004%20Introducing%203.jpg"
                alt="..."
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-1 max-h-16">
              <p className="text-sm text-nowrap text-biru opacity-65">diselenggarakan oleh</p>
              <p className=" uppercase text-birutua font-semibold text-nowrap">
                Redrose Records
              </p>
            </div>
          </div>
        </div>
      </div>

      </div>
    </div>

    <div className="flex flex-col lg:flex-row max-w-full p-3 lg:p-8 gap-3 lg:gap-10 justify-center lg:px-2">
      <div className="flex flex-col  lg:flex-col w-full h-auto lg:max-w-[720px] lg:max-h-[375px]">
      <h6 className='text-lg text-biru font-bold'>DESCRIPTION</h6>
        <p className=" text-justify text-birutua ">{data.events.description}</p>
      </div>

      <div className="flex">
      <div className="flex flex-col w-full h-fit p-5 border gap-3">
      <div className="flex flex-col gap-2">
        <h6 className="text-md">
          <span className="font-bold uppercase">{data.events.ticketName}</span> {' '}
          <span className='block'>Start Sale: {data.events.startSaleDate}</span>
          <span className='block'>End Sale: {data.events.startSaleDate}</span>
        </h6>
        <p className="inline-flex gap-1">
          <MdOutlineEventSeat className='text-xl'/>
          Available Seats: {data.events.availableSeat}
        </p>
      </div>
      <div>
        <div className="flex flex-col gap-3">
          <hr />
          <div className="flex justify-between">
            <p className="font-bold py-1">{formatToIDR(data.events.ticketPrice)}</p>
            {/* <div className="inline-flex">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>

      </div>
    </div>



      {/* <div className="flex flex-col  max-w-full gap-3 lg:gap-10 justify-center lg:px-10">
        <p className=" text-justify">{data.events.description}</p>
      </div> */}

      {/* <SectionTwo/>
      <div>
      <p className=" text-justify">{data.events.description}</p>

      </div> */}
      </div>
    </div>
  );
}
