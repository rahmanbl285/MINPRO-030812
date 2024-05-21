export default function Dropdown() {
  return (
    <div className="relative">
      <details className="dropdown flex items-center absolute">
        <summary className="  m-1 btn bg-white text-[#020330] border-none">Filter</summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          <li><a>Waktu Mulai (Terdekat)</a></li>
          <li><a>Waktu Mulai (Terjauh)</a></li>
          <li><a>Nama Event(A-Z)</a></li>
          <li><a>Nama Event(Z-A)</a></li>
        </ul>
      </details>
    </div>
  );
}




// export default function Dropdown () {
//     return (
//         <div>
//         <details className="dropdown">
//   <summary className="m-1 btn bg-white text-[#020330] border-none ">open or close</summary>
//   <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
//     <li><a>Item 1</a></li>
//     <li><a>Item 2</a></li>
//   </ul>
// </details>
// </div>
//     )
// }