import { splitStr } from '@/helpers/splitStr';
import Image from 'next/image';
import Link from 'next/link';

interface iCardTemplate {
  imgEvent: string
  title: string
  date: string
  price: number
  imgUser: string
  nameUser: string
  linkEvent: string
  linkProfile: string
}

export default function CardTemplate({imgEvent, title, date, price, imgUser, nameUser, linkEvent, linkProfile}:iCardTemplate) {
  return (
    <div className=" max-w-72 rounded shadow-lg bg-putih">
      <Link href={linkEvent}>
      <Image
        className="w-full"
        src={imgEvent}
        alt={title}
        width={250}
        height={100}
      />

      <div className='flex flex-col h-32 justify-center '>
        <div className="font-bold text-md px-4 pt-2 mb-2">
          {splitStr(title, 23)}
        </div>
        <div className="px-4 pb-4">
            <p className="text-gray-700 text-sm">{date}</p>
            <p className="font-bold mt-2 text-md">Rp {price}</p>
        </div>
      </div>
      </Link>

      {/* image */}
      <Link href={linkProfile}>
      <hr className=" text-abu" />
      <div className="flex px-6 py-4 gap-3">
        <div className="h-12 w-12 px-6 relative">
          <Image
            src={imgUser}
            alt={nameUser}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* bagian nama */}
        <div className="flex items-center">
          <h6 className="text-sm text-nowrap">{splitStr(nameUser, 23)}</h6>
        </div>
      </div>
      </Link>
    </div>
  );
}
