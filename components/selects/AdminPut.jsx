import { ErrorMessage, useField } from "formik";

export default function AdminInput({ placeholder, label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        Product {label}
      </label>
      <input
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
        className=" mt-1 block w-full border border-gray-300   shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
        style={{ height: "40px" }} // Set the desired height here
      />
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">
          <ErrorMessage name={field.name} />
        </div>
      )}
    </div>
  );
}
