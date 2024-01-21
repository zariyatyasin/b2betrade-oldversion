import { ErrorMessage, useField } from "formik";

export default function AdminInput({ placeholder, label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
        className="border border-gray-950 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
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
