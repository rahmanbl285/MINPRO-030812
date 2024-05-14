import SeeMoreButton from '@/components/home/buttonSeeMore';
import CarouselHome from '@/components/home/carousel';
import CategoryEvent from '@/components/home/categoryEvent';
import CategoryLocation from '@/components/home/categoryLocation';
import TopThree from '@/components/home/topThree';

export default function Home() {
  return (
    <div className="flex h-fit flex-col w-full bg-putih px-5">
      <div className="flex pt-28">
        <CarouselHome />
      </div>
      <TopThree />
      <CategoryEvent />
      <CategoryLocation />
      <SeeMoreButton />
    </div>
  );
    <section>
    <div className="flex h-screen overflow-hidden flex-col lg:flex-row  items-center p-16 bg-[#F7F6F2]">
      <p>ini home</p>
    </div>
</section>
  )
}
