import { ErrorMessage, useField } from "formik";

export default function AdminInput({ placeholder, label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      <label className="block   text-sm  font-medium  mb-2">
        Product {label}
      </label>
      <input
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
        className=" border   px-4 py-4   w-full"
        style={{ height: "48px" }} // Set the desired height here
      />
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">
          <ErrorMessage name={field.name} />
        </div>
      )}
    </div>
  );
}
