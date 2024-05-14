import { IoIosArrowDown } from 'react-icons/io';

export default function DropdownLocation() {
  return (
    <div>
      <details className="dropdown dropdown-bottom">
        <summary className="m-1 btn p-0 border-0 shadow-none text-biru bg-transparent text-xl font-bold">
          Jakarta <IoIosArrowDown />
        </summary>
        <div className='flex justify-center'>
        <ul className="p-2 shadow menu w-fit dropdown-content z-[1] bg-base-100 rounded-box">
          {/* SEARCH BAR */}
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
        </div>
      </details>
    </div>
  );
}
