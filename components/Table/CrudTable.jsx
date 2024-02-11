import React, { useState } from "react";
import { Button } from "../../components/ui/button";

export default function CrudTable({
  columns,
  data,
  onSubmitDelete,
  onSubmitView,
  onEdit,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = data?.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleDelete = async (id) => {
    onSubmitDelete(id._id);
  };
  const handleView = async (id) => {
    onSubmitView(id._id);
  };

  return (
    <div className="mt-20">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 mb-4"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.headerName}
                </th>
              ))}
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit / View / Delete</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100">
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {column.field === "image" ? (
                      <img
                        src={row[column.field]}
                        alt="Image"
                        className="w-16 h-16 object-cover"
                      />
                    ) : column.renderCell ? (
                      column.renderCell({ row })
                    ) : (
                      row[column.field]
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    onClick={() => onEdit(row)}
                    variant="outline"
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleView(row)}
                    variant="outline"
                    className="mr-2"
                  >
                    View
                  </Button>
                  <Button onClick={() => handleDelete(row)} className="mr-2">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
