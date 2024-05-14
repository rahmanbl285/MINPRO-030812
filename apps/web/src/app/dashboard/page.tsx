import Image from 'next/image'
import MenuEvent from '@/components/dashboard/MenuEvent'
import Card from '@/components/dashboard/Card'
import Dropdown from '@/components/dashboard/Dropdown'

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen bg-[#F7F6F2]">

        {/* background */}
        <div className=' w-full flex justify-center bg-[#F7F6F2]' >
            <div className='flex justify-center relative  w-fit'>
                <Image className="flex transform " src="/dashboard.png" alt="gambarr" width={900} height={900}></Image>
                <div className='flex absolute flex-col items-start bottom-0 left-4 translate-y-10'>
                    <Image className='flex transform' src='/maklii.png' alt='heho' width={100} height={100}></Image>
                </div>
            </div>  
        </div>

        <div className='border border-black-400 flex flex-col lg:flex-row'>
            <div className='bg-[#F7F6F2]'>
                
                {/* heading */}
                <div className="flex flex-col text-[#020330] border-r-[3px] border-black-300 ">
                    <h1 className="pl-4 sm:pl-8 text-start text-[20px] bottom-16 font-bold bg-[#F7F6F2] flex-wrap mt-[55px]">CK Star Entertainment </h1>
                </div>

              <div className='bg-[#F7F6F2]'>
                <div className='flex flex-col text-[#33344f]'>
                    <p className='ml-[18px] sm:pl-4 text-start text-[12px] mt-[12px] flex-wrap'>Member Sejak 2019</p>
                </div>
              </div>

            </div>
            
            <div className='w-full'>
                <MenuEvent/>
                <div className='w-full bg-[#F7F6F2]'>
                    <Card/>
                    <div className=''>
                        <Dropdown/>
                    </div>
                </div>

            </div>

        </div>


    </div>

  )
}
