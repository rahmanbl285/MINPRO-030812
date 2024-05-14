import Image from "next/image";

export default function TopThree() {
  const arrTopThree = [
    {
      num: 1,
      imgUrl:
        'https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20240420041901.png',
    },
    {
      num: 2,
      imgUrl:
        'https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20240424150324_6628bccc064cc.jpg',
    },
    {
      num: 3,
      imgUrl:
        'https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20240326110356_6602492c2fd18.jpg',
    },
  ];

  return (
    <div className="flex flex-col gap-5">

      <div className="flex pt-10">
        <h6 className=" text-xl font-bold">Paling laku keras!</h6>
      </div>

      <div className="bg-biru w-full rounded-lg h-fit pl-3">
        <div className="flex flex-col md:flex-row justify-evenly">
          {arrTopThree.map((item, idx) => (
            <div key={idx} className="flex justify-between max-w-full gap-2 overflow-x-auto">
              <div className="flex justify-center items-center w-[10%]">
                <h1 className="text-7xl text-putih font-bold">{item.num}</h1>
              </div>
              <div className="flex items-stretch p-5 max-h-40 w-[90%] md:w-96">
                <Image width={500} height={100} className="object-cover" src={item.imgUrl} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
