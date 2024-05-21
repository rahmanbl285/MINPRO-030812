import CardTemplate from "../template/cardTemplate"

export default function ProductCardAll() {
  const productAll = [
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
  ]
  return (
    <div>
      <div className="flex">
        <div className="flex flex-wrap justify-center md:justify-normal items-center my-5 max-w-full gap-4">
          {productAll.map((item, idx) => (
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
        </div>
      </div>
    </div>
  )
}
