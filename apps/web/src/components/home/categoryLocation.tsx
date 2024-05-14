import CardSeeMore from '../template/cardSeeMore';
import CardTemplate from '../template/cardTemplate';
import DropdownLocation from './ddLocation';

export default function CategoryLocation() {
  const byLocation = [
    {
      imgEvent:
        'https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20240405213040_66100b10221fb.jpg',
      title: 'Gedebage Jazz Festival',
      date: '11 May - 12 May 2024',
      price: 149000,
      imgUser:
        'https://pbs.twimg.com/profile_images/1203987594205265921/Li0FoEiP_400x400.jpg',
      nameUser: 'Summarecon Mall Bandung',
      linkEvent: '/jelajah',
      linkProfile: '/dashboard',
    },
    {
      imgEvent:
        'https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20240405213040_66100b10221fb.jpg',
      title: 'Gedebage Jazz Festival',
      date: '11 May - 12 May 2024',
      price: 149000,
      imgUser:
        'https://pbs.twimg.com/profile_images/1203987594205265921/Li0FoEiP_400x400.jpg',
      nameUser: 'Summarecon Mall Bandung',
      linkEvent: '/jelajah',
      linkProfile: '/dashboard',
    },
    {
      imgEvent:
        'https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20240405213040_66100b10221fb.jpg',
      title: 'Gedebage Jazz Festival',
      date: '11 May - 12 May 2024',
      price: 149000,
      imgUser:
        'https://pbs.twimg.com/profile_images/1203987594205265921/Li0FoEiP_400x400.jpg',
      nameUser: 'Summarecon Mall Bandung',
      linkEvent: '/jelajah',
      linkProfile: '/dashboard',
    },
    {
      imgEvent:
        'https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20240405213040_66100b10221fb.jpg',
      title: 'Gedebage Jazz Festival',
      date: '11 May - 12 May 2024',
      price: 149000,
      imgUser:
        'https://pbs.twimg.com/profile_images/1203987594205265921/Li0FoEiP_400x400.jpg',
      nameUser: 'Summarecon Mall Bandung',
      linkEvent: '/jelajah',
      linkProfile: '/dashboard',
    },
    {
      imgEvent:
        'https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20240405213040_66100b10221fb.jpg',
      title: 'Gedebage Jazz Festival',
      date: '11 May - 12 May 2024',
      price: 149000,
      imgUser:
        'https://pbs.twimg.com/profile_images/1203987594205265921/Li0FoEiP_400x400.jpg',
      nameUser: 'Summarecon Mall Bandung',
      linkEvent: '/jelajah',
      linkProfile: '/dashboard',
    },
    {
      imgEvent:
        'https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20240405213040_66100b10221fb.jpg',
      title: 'Gedebage Jazz Festival',
      date: '11 May - 12 May 2024',
      price: 149000,
      imgUser:
        'https://pbs.twimg.com/profile_images/1203987594205265921/Li0FoEiP_400x400.jpg',
      nameUser: 'Summarecon Mall Bandung',
      linkEvent: '/jelajah',
      linkProfile: '/dashboard',
    },
    {
      imgEvent:
        'https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20240405213040_66100b10221fb.jpg',
      title: 'Gedebage Jazz Festival',
      date: '11 May - 12 May 2024',
      price: 149000,
      imgUser:
        'https://pbs.twimg.com/profile_images/1203987594205265921/Li0FoEiP_400x400.jpg',
      nameUser: 'Summarecon Mall Bandung',
      linkEvent: '/jelajah',
      linkProfile: '/dashboard',
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1">
        <h6 className="font-bold text-xl inline-flex">Populer di</h6>
        <DropdownLocation />
      </div>

      <div className="flex my-5 overflow-x-scroll gap-5">
        {byLocation.map((item, idx) => (
          <CardTemplate key={idx}
            imgEvent={item.imgEvent}
            title={item.title}
            date={item.date}
            price={item.price}
            imgUser={item.imgUser}
            nameUser={item.nameUser}
            linkEvent={item.linkEvent}
            linkProfile={item.linkProfile}
          />
          ))}
          <CardSeeMore />
      </div>
    </div>
  );
}
