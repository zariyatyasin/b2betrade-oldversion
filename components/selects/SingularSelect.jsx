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
    <div style={{ marginBottom: "1rem" }}>
      {header && (
        <div>
          <div>
            {meta.error && (
              <img src="../../../images/warning.png" alt="warning" />
            )}
            {header}
          </div>
        </div>
      )}
      <TextField
        variant="outlined"
        name={field.name}
        select
        disabled={isDisabled}
        label={placeholder}
        value={field.value || ""}
        onChange={handleChange}
      >
        <MenuItem key="" value="">
          No Selected / Or Empty
        </MenuItem>
        {data?.map((option) => (
          <MenuItem key={option._id} value={option._id || option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      {meta.touched && meta.error && (
        <p>
          <ErrorMessage name={field.name} />
        </p>
      )}
    </div>
  );
}
