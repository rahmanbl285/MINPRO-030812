import { Field } from "formik";

export default function DescriptionForm() {
  return (
    <div>
      <label className="form-control">
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="Deskripsi Event"
        ></textarea>
      </label>
    </div>
  );
}
