'use client'

import { useEffect, useState } from 'react';
import CardSeeMore from '../template/cardSeeMore';
import {CardTemplate} from '../template/cardTemplate';
import DropdownLocation from './ddLocation';
import { iCardTemplate } from '@/types/cardTemplate';
import { getEvent } from '@/lib/event';

export default function CategoryLocation() {
  const [product, setProduct] = useState<iCardTemplate[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvent()
        setProduct(data.event)
        console.log(data.event)
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    }
    fetchEvents()
  },[])


  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1">
        <h6 className="font-bold text-xl inline-flex">Populer di</h6>
        <DropdownLocation />
      </div>

      <div className="flex my-5 overflow-x-scroll gap-5">
      {product.map((event) => (
            <CardTemplate key={event.id} event={event}/>
          ))}
          <CardSeeMore />
      </div>
    </div>
  );
}
