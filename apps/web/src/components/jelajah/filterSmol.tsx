'use client'

import Link from "next/link";

export default function FilterSmol() {
  return (
    <div className="flex justify-evenly w-full gap-4 ">
      <div className="w-1/2">
        <Link href={''}
          className="btn w-full bg-kuning text-biru"
          onClick={() =>
            (
              document.getElementById('my_modal_3') as HTMLFormElement
            ).showModal()
          }
        >
          Filter
        </Link>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click outside to close</p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
      <div className="w-1/2">
        <button
          className="btn w-full bg-kuning text-biru"
          onClick={() =>
            (
              document.getElementById('my_modal_4') as HTMLFormElement
            ).showModal()
          }
        >
          Urutkan
        </button>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click outside to close</p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>

    </div>
  );
}
