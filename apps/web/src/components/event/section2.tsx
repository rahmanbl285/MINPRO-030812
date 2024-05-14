'use client'
import { useState } from 'react';
import BuyCardLg from './buyCardLg';
import BuyCardSm from './buyCardSm';
import TabsEvent from './tabs';

export default function SectionTwo() {
    const [ticketCount, setTicketCount] = useState(0);
  return (
    <>
      <div className="flex flex-col lg:flex-row max-w-full gap-3 lg:gap-10 justify-center px-3 pb-5 lg:py-5 lg:px-2 text-birutua">
        <div className="w-full h-auto lg:max-w-[720px] lg:max-h-[375px]">
          <TabsEvent onCountChange={setTicketCount}/>
        </div>
        <div className="flex">
          <div className="hidden lg:flex">
            <BuyCardLg ticketCount={ticketCount}/>
          </div>
        </div>
      </div>
      <div className="flex lg:hidden">
        <BuyCardSm ticketCount={ticketCount} />
      </div>
    </>
  );
}
