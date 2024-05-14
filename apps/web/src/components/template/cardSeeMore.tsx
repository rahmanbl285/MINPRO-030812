import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function CardSeeMore() {
  return (
    <div className="flex flex-col justify-center items-center gap-3 min-w-72 rounded shadow-lg bg-biru">
      <Link href={'/jelajah'} className="btn btn-circle">
        <FaArrowRight className="text-2xl text-biru"/>
      </Link>
      <p className="font-bold text-putih">
        Lihat semua
      </p>
    </div>
  );
}
