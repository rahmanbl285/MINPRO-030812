import Link from "next/link";

export default function EventBreadCrumbs() {
  return (
    <div className="flex pt-4 lg:pt-0 px-4 lg:px-0">
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link href={'/'}>Home</Link>
          </li>
          <li>
            <Link href={'/jelajah'}>Kategori</Link>
          </li>
          <li>Title</li>
        </ul>
      </div>
    </div>
  );
}
