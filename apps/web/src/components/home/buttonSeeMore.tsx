import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function SeeMoreButton () {
    return (
        <div className="flex justify-center items-center py-4">
            <Link href={'/jelajah'} className="btn bg-biru text-putih btn-wide px-2">Jelajah ke lebih banyak event <IoIosArrowForward /></Link>
        </div>
    )
}