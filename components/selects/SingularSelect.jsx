import { MenuItem, TextField } from "@mui/material";
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
      <TextField
        variant="outlined"
        name={field.name}
        select
        fullWidth
        disabled={isDisabled}
        label={placeholder}
        value={field.value || ""}
        onChange={handleChange}
        error={meta.touched && meta.error ? true : false}
      
        helperText={meta.touched && meta.error ? meta.error : ""}
      >
        <MenuItem value="">Select an option</MenuItem>
        {data?.map((option) => (
          <MenuItem key={option._id} value={option._id || option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}
