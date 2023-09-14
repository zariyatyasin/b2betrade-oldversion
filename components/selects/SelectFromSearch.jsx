import { TextField } from "@mui/material";
import { ErrorMessage, useField } from "formik";
import { useState } from "react";

export default function SearchSelection({
  data,
  placeholder,
  header,
  disabled,
  error,
  touched,
  handleChange, // Added handleChange prop
  ...rest
}) {
  const [field, meta] = useField(rest);
  const isDisabled = disabled === true || disabled === "true";
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Function to update suggestions based on search query
  const updateSuggestions = (query) => {
    const filteredOptions = data.filter(
      (option) =>
        option.name.toLowerCase().includes(query.toLowerCase()) ||
        option._id.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filteredOptions);
  };

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

      {/* Input field for searching */}
      <TextField
        variant="outlined"
        name={field.name}
        disabled={isDisabled}
        label={placeholder}
        value={searchQuery}
        onChange={(e) => {
          const { value } = e.target;
          setSearchQuery(value);
          updateSuggestions(value);
        }}
      />

      {/* Display suggestions */}
      <div>
        {suggestions.map((option) => (
          <div
            key={option._id}
            onClick={() => {
              setSearchQuery(option.name);
              handleChange({
                target: { value: option.name, name: field.name },
              });
            }}
          >
            {option.name}
          </div>
        ))}
      </div>

      {meta.touched && meta.error && (
        <p>
          <ErrorMessage name={field.name} />
        </p>
      )}
    </div>
  );
}
