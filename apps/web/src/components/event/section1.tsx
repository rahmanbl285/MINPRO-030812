'use client'

import Image from 'next/image';
import EventBreadCrumbs from './eventBreadCrumbs';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { getEvent, getEventSlug } from '@/lib/event';
import { IEvent } from '@/types/event';

export const revalidate = 3600

export const generateStaticParams = async () => {
  const data = await getEvent()

  return data.events?.map((event: IEvent) => ({
      params: {
          slug: event?.eventSlug
      }
  }))
}

export async function generateMetadata({ params }: { params: { slug: string }}) {
  const data = await getEventSlug(params.slug)
  console.log(data)

  return data
}


export default async function SectionOne({ params }: { params: { slug: string }}) {
  const data = await getEventSlug(params.slug)

  return (
    <div className="flex flex-col lg:flex-row max-w-full gap-3 lg:gap-10 justify-center lg:px-2">
      <div className="flex flex-col-reverse lg:flex-col w-full h-auto lg:max-w-[720px] lg:max-h-[375px]">
        <EventBreadCrumbs />
        <div className='flex justify-center'>
          <Image
            src={data.events.eventImage}
            alt={''}
            width={1000}
            height={350}
          ></Image>
        </div>
      </div>
      <div className="flex">
      <div className="bg-putih card shadow-none rounded-none lg:rounded-lg w-full lg:shadow-xl">
        <div className="card-body p-3 lg:p-8 justify-center lg:max-w-[375px] lg:max-h-[375px] gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="card-title uppercase font-bold text-birutua">JOURNEY IN HARMONY</h2>
            <p className="inline-flex gap-3 text-birutua">
              <FaCalendarAlt className="text-lg text-biru opacity-65" /> 08 - 29 May 2024
            </p>
            <p className="inline-flex gap-3 text-birutua">
              <FaClock className="text-lg text-biru opacity-65" /> 19:00 - 21:00 WIB
            </p>
            <p className="inline-flex gap-3 text-birutua">
              <FaLocationDot className="text-lg text-biru opacity-65" />
              Krapela, Row 9, DKI Jakarta
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
      <div>
                    <p className=" text-justify">{data.events.description}</p>

      </div>
    </div>
  );
}
