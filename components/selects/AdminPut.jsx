import { ErrorMessage, useField } from "formik";
import { MenuItem, TextField } from "@mui/material";
export default function AdminInput({ placeholder, label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <TextField
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">
          <ErrorMessage name={field.name} />
        </div>
      )}
    </div>
  );
}
