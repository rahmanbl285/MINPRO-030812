export default function AccordionFilter() {
  
  return (
    <div className="flex flex-col">
      <div className="collapse collapse-arrow">
        <input type="checkbox" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-lg font-medium">
          Lokasi
        </div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
      <div className="collapse collapse-arrow">
        <input type="checkbox" name="my-accordion-2" />
        <div className="collapse-title text-lg font-medium">
          Kategori
        </div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
      <div className="collapse collapse-arrow">
        <input type="checkbox" name="my-accordion-2" />
        <div className="collapse-title text-lg font-medium">
          Waktu
        </div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
    </div>
  );
}
