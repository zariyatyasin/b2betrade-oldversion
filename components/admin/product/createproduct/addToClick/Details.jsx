import { useState } from "react";
import { Delete, Add } from "@mui/icons-material"; // Import MUI icons

export default function Details({ details, product, setProduct }) {
  const handleDetails = (i, e) => {
    const values = [...details];
    values[i][e.target.name] = e.target.value;
    setProduct({ ...product, details: values });
  };

  const handleRemove = (i) => {
    if (details.length > 0) {
      const values = [...details];
      values.splice(i, 1);
      setProduct({ ...product, details: values });
    }
  };

  return (
    <div>
      <div className="text-lg font-semibold mb-4">Details</div>{" "}
      {/* Apply Tailwind CSS classes for styling */}
      {details.length === 0 && (
        <Add
          className="text-green-600 cursor-pointer" // Apply Tailwind CSS classes and MUI icon
          onClick={() => {
            setProduct({
              ...product,
              details: [
                ...details,
                {
                  name: "",
                  value: "",
                },
              ],
            });
          }}
        />
      )}
      {details
        ? details.map((detail, i) => (
            <div className="flex items-center space-x-2 mb-2" key={i}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={detail.name}
                onChange={(e) => handleDetails(i, e)}
                className="border rounded-md p-2 w-40" // Apply Tailwind CSS classes for input styling
              />
              <input
                type="text"
                name="value"
                placeholder="Value"
                value={detail.value}
                onChange={(e) => handleDetails(i, e)}
                className="border rounded-md p-2 w-40" // Apply Tailwind CSS classes for input styling
              />

              <>
                <Delete
                  onClick={() => handleRemove(i)}
                  className="text-red-600 cursor-pointer" // Apply Tailwind CSS classes and MUI icon
                />
                <Add
                  onClick={() => {
                    setProduct({
                      ...product,
                      details: [
                        ...details,
                        {
                          name: "",
                          value: "",
                        },
                      ],
                    });
                  }}
                  className="text-green-600 cursor-pointer" // Apply Tailwind CSS classes and MUI icon
                />
              </>
            </div>
          ))
        : ""}
    </div>
  );
}
