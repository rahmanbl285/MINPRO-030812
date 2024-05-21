'use client'

import { useEffect, useState } from "react"
import {CardTemplate} from "../template/cardTemplate"
import { getEvent } from "@/lib/event"
import { iCardTemplate } from "@/types/cardTemplate"

export default function ProductCardAll() {
  const [productAll, setProductAll] = useState<iCardTemplate[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvent()
        setProductAll(data.event)
        console.log(data.event)
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    }
    fetchEvents()
  },[])

  return (
    <div>
      <div className="flex">
        <div className="flex flex-wrap justify-center md:justify-normal items-center my-5 max-w-full gap-4">
          {productAll.map((event) => (
            <CardTemplate key={event.id} event={event}/>
          ))}
        </div>
      </div>
    </div>
  )
}
