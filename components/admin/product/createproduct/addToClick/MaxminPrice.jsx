import { useState } from "react";
import { Delete, Add } from "@mui/icons-material"; // Import MUI icons

export default function MaxminPrice({ bulkPricing, product, setProduct }) {
  const handleBulkPricing = (i, e) => {
    const values = [...bulkPricing];
    values[i][e.target.name] = e.target.value;
    setProduct({ ...product, bulkPricing: values });
  };

  const handleRemove = (i) => {
    if (bulkPricing.length > 0) {
      const values = [...bulkPricing];
      values.splice(i, 1);
      setProduct({ ...product, bulkPricing: values });
    }
  };

  return (
    <div>
      <div className="text-lg font-semibold mb-4">Bulk Pricing</div>{" "}
      {/* Apply Tailwind CSS classes for styling */}
      {bulkPricing.length === 0 && (
        <Add
          className="text-green-600 cursor-pointer" // Apply Tailwind CSS classes and MUI icon
          onClick={() => {
            setProduct({
              ...product,
              bulkPricing: [
                ...bulkPricing,
                {
                  minQty: 0,
                  maxQty: 0,
                  price: 0,
                },
              ],
            });
          }}
        />
      )}
      {bulkPricing
        ? bulkPricing.map((pricing, i) => (
            <div className="flex items-center space-x-2 mb-2" key={i}>
              <input
                type="number"
                name="minQty"
                placeholder="Min Qty"
                value={pricing.minQty}
                onChange={(e) => handleBulkPricing(i, e)}
                className="border rounded-md p-2 w-40" // Apply Tailwind CSS classes for input styling
              />
              <input
                type="number"
                name="maxQty"
                placeholder="Max Qty"
                value={pricing.maxQty}
                onChange={(e) => handleBulkPricing(i, e)}
                className="border rounded-md p-2 w-40" // Apply Tailwind CSS classes for input styling
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={pricing.price}
                onChange={(e) => handleBulkPricing(i, e)}
                className="border rounded-md p-2 w-40" // Apply Tailwind CSS classes for input styling
              />
              <>
                <Delete
                  onClick={() => handleRemove(i)}
                  className="text-red-600 cursor-pointer" // Apply Tailwind CSS classes and MUI icon
                />
                {bulkPricing.length < 4 && (
                  <Add
                    onClick={() => {
                      setProduct({
                        ...product,
                        bulkPricing: [
                          ...bulkPricing,
                          {
                            minQty: 0,
                            maxQty: 0,
                            price: 0,
                          },
                        ],
                      });
                    }}
                    className="text-green-600 cursor-pointer" // Apply Tailwind CSS classes and MUI icon
                  />
                )}
              </>
            </div>
          ))
        : ""}
    </div>
  );
}
