import Image from 'next/image';
import EventBreadCrumbs from './eventBreadCrumbs';
import EventDetail from './eventDetailCard';

export default function SectionOne() {
  return (
    <div className="flex flex-col lg:flex-row max-w-full gap-3 lg:gap-10 justify-center lg:px-2">
      <div className="flex flex-col-reverse lg:flex-col w-full h-auto lg:max-w-[720px] lg:max-h-[375px]">
        <EventBreadCrumbs />
        <div className='flex justify-center'>
          <Image
            src={
              'https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20240424192022_6628f906ed82b.jpg'
            }
            alt={''}
            width={1000}
            height={350}
          ></Image>
        </div>
      </div>
      <div className="flex">
        <EventDetail />
      </div>
    </div>
  );
}
