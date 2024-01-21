import { ErrorMessage, useField } from "formik";

export default function SingularSelect({
  data,
  handleChange,
  placeholder,
  header,
  disabled,
  error,
  touched,
  ...rest
}) {
  const [field, meta] = useField(rest);
  const isDisabled = disabled === true || disabled === "true";

  return (
    <div className="mb-4">
      {header && <div className="mb-2 font-bold">{header}</div>}
      <select
        name={field.name}
        onChange={handleChange}
        value={field.value || ""}
        disabled={isDisabled}
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      >
        <option value="">Select an option</option>
        {data?.map((option) => (
          <option key={option._id} value={option._id || option.name}>
            {option.name}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">
          <ErrorMessage name={field.name} />
        </div>
      )}
    </div>
  );
}
