import Link from 'next/link';
import { IoReload } from 'react-icons/io5';
import AccordionFilter from './accordion';

export default function DrawerFilter() {
  return (
    <div>
      <div className="drawer md:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-8 pt-28 w-80 min-h-full bg-putih text-biru">
            {/* Sidebar content here */}
            <li>
              <div className="inline-flex justify-between">
                <h4 className="font-bold text-lg">Filter</h4>
                <Link href={'/jelajah'}>
                  <IoReload className="text-lg font-bold" />
                </Link>
              </div>
            </li>
            <AccordionFilter/>
          </ul>
        </div>
      </div>
    </div>
  );
}
