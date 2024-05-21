import SectionOne from '@/components/event/section1';
import SectionTwo from '@/components/event/section2';

export default function Event() {
  return (
    <div className="flex flex-col w-screen h-fit bg-putih pt-20 lg:pt-24">
      <SectionOne />
      <SectionTwo/>
    </div>
  );
}
