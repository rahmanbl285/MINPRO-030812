import Image from "next/image";

export default function Card() {
    return(
    <div className="flex">
        <div className="flex justify-center border-2 border-red-500 ">
            <div className="bg-[#F7F6F2] flex flex-col sm:max-w-sm md:max-w-sm card card-compact w-52 sm:w-full shadow-xl p-8 ">
                <figure>
                    <img src="/drim1.jpg" alt="deurimis"/>
                </figure>
                <div className="card-body ">
                    <h2 className="card-title text-[#020330] font-bold ">Konser Dreamies</h2>
                    <p className="text-[#020330] text-lg">4 Mei 2024</p>
                    <p className="mb-3 text-lg font-bold text-[#020330]">Rp 100.000,-</p>
                    <div className="card-actions justify-end text-[#4B6587]">
                        <button className="btn bg-[#4B6587] border-none shadow-lg hover:border-[#070a7a] text-white">BELI</button>
                    </div>  
                </div>
            </div>
        </div>
        
    </div>
    )
}


// <div className="bg-[#F7F6F2] ">
//     <div className="flex flex-col border border-gray-200 dark:bg-gray-800 dark:border-gray-700 max-w-sm rounded-lg overflow-hidden shadow-lg">
//         <a href="#">
//             <div className="bg-[#F7F6F2] ">
//             <Image className="  rounded-t-lg justify-center pl-[10px]" src="/drim1.jpg" alt="hoho" width={200} height={200} />
//     </div>
//         </a>
//     <div className="p-5 bg-[#F7F6F2]">
//         <a href="#">
//             <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">Konser anak JCWD nih</h5>
//         </a>
//         <p className="mb-3 font-normal text-gray-900 dark:text-gray-400">24 Mei 2024.</p>
//         <p className="mb-3 font-normal text-black ">Rp.100.000,-</p>
//         <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//             AYOOOKK BELI EHEHEHE
//             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
//             </svg>
//         </a>
//     </div>
//     </div>
// </div>