'use client'

import Link from "next/link";
import { useState } from "react";
import Ticket from "./ticket";

interface TabsEventProps {
    onCountChange: (count: number) => void;
  }

export default function TabsEvent({ onCountChange }: TabsEventProps) {

    const [activeTab, setActiveTab] = useState("deskripsi")
    const handleTabClick = (tab:any, event:any) => {
        event.preventDefault(); // Mencegah scroll ke atas
        setActiveTab(tab);
      };
    
      return (
        <div className="pt-6 lg:max-w-[720px] lg:max-h-[375px]">
          <div role="tablist" className="tabs tabs-bordered">
            <Link href="#" role="tab" className={`tab text-birutua text-md font-bold ${activeTab === "deskripsi" ? 'tab-active' : ''}`} onClick={(e) => handleTabClick("deskripsi", e)}>
              DESKRIPSI
            </Link>
            <Link href="#" role="tab" className={`tab text-birutua text-md font-bold ${activeTab === "tiket" ? 'tab-active' : ''}`} onClick={(e) => handleTabClick("tiket", e)}>
              TIKET
            </Link>
          </div>
          
          <div className="mt-5 px-5">
            {activeTab === "deskripsi" && (
              <div className="flex flex-col gap-2">
                {/* Konten untuk deskripsi */}
                <h6 className="font-bold text-lg">EVENT DESCRIPTION</h6>
                <p className=" text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error delectus voluptatum explicabo maxime modi asperiores facilis, provident similique quae tempore reprehenderit aspernatur veniam. Beatae, ducimus reiciendis. Magni earum laboriosam sunt!</p>
              </div>
            )}
            {activeTab === "tiket" && (
              <div>
                {/* Konten untuk tiket */}
                <Ticket onCountChange={onCountChange}/>
              </div>
            )}
          </div>
        </div>
      );}
