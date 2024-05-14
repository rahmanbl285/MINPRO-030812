import Image from "next/image";
import { FaGuitar, FaMicrophoneAlt, FaPhotoVideo } from "react-icons/fa";
import { MdOutlineFestival, MdOutlineSportsKabaddi } from "react-icons/md";
import { HiMiniPaintBrush } from "react-icons/hi2";
import { GiSydneyOperaHouse } from "react-icons/gi";
import Link from "next/link";

export default function CategoryEvent() {
  return (
    <>
      <div className="flex pt-10">
        <h6 className=" text-xl font-bold">Kategori Event</h6>
      </div>

      <div className="w-full h-40 pt-5 md:h-36 ">
        <div className="flex gap-10 justify-evenly items-center overflow-x-auto">
            {/* icons festival */}
            <Link href={`/jelajah`}>
            <div className="flex flex-col items-center justify-center min-h-24 min-w-24 bg-biru rounded-lg relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <MdOutlineFestival className="text-4xl text-putih"/>
                    <h6 className="font-bold text-sm text-putih">Festival</h6>
                  </div>
                </div>
            </div>
            </Link>

            {/* icons konser */}
            <Link href={`/jelajah`}>
            <div className="flex flex-col items-center justify-center min-h-24 min-w-24 bg-abu rounded-lg relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <FaGuitar className="text-4xl text-biru"/>
                    <h6 className="font-bold text-sm text-biru">Konser</h6>
                  </div>
                </div>
            </div>
            </Link>

            {/* icons pertandingan */}
            <Link href={`/jelajah`}>
            <div className="flex flex-col items-center justify-center min-h-24 min-w-24 bg-kuning rounded-lg relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <MdOutlineSportsKabaddi className="text-4xl text-biru"/>
                    <h6 className="font-bold text-sm text-biru">Pertandingan</h6>
                  </div>
                </div>
            </div>
            </Link>

            {/* icons pameran */}
            <Link href={`/jelajah`}>
            <div className="flex flex-col items-center justify-center min-h-24 min-w-24 bg-biru rounded-lg relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <FaPhotoVideo className="text-4xl text-kuning"/>
                    <h6 className="font-bold text-sm text-putih">Pameran</h6>
                  </div>
                </div>
            </div>
            </Link>

            {/* icons workshop */}
            <Link href={`/jelajah`}>
            <div className="flex flex-col items-center justify-center min-h-24 min-w-24 bg-abu rounded-lg relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <HiMiniPaintBrush className="text-4xl text-biru"/>
                    <h6 className="font-bold text-sm text-putih">Workshop</h6>
                  </div>
                </div>
            </div>
            </Link>
            
            {/* icons pertunjukan */}
            <Link href={`/jelajah`}>
            <div className="flex flex-col items-center justify-center min-h-24 min-w-24 bg-kuning rounded-lg relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <GiSydneyOperaHouse className="text-4xl text-biru"/>
                    <h6 className="font-bold text-sm text-biru">Pertunjukan</h6>
                  </div>
                </div>
            </div>
            </Link>

            {/* icons seminar */}
            <Link href={`/jelajah`}>
            <div className="flex flex-col items-center justify-center min-h-24 min-w-24 bg-biru rounded-lg relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <FaMicrophoneAlt className="text-4xl text-putih"/>
                    <h6 className="font-bold text-sm text-putih">Seminar</h6>
                  </div>
                </div>
            </div>
            </Link>

        </div>
      </div>
    </>
  );
}
