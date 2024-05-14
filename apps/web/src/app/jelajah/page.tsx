import DrawerFilter from '@/components/jelajah/drawerFilter';
import FilterSmol from '@/components/jelajah/filterSmol';
import PaginationJelajah from '@/components/jelajah/pagination';
import ProductCardAll from '@/components/jelajah/product';

export default function Jelajah() {
  return (
    <div className="flex h-fit w-full bg-putih px-5">
      <div className="">
        <DrawerFilter />
      </div>
      <div className="flex flex-col gap-5 w-full pt-28">
        <div className="md:hidden">
          <FilterSmol />
        </div>
        <p className="text-sm ">Menampilkan 1 - 6 dari 6 public events</p>
        <div className="gap-10">
          <ProductCardAll />
        </div>
        <div className='flex justify-center items-center pb-10'>

          <PaginationJelajah/>
        </div>
      </div>
    </div>
  );
}
