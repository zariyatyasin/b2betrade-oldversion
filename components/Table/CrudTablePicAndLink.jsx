import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Table } from "@mui/material";

import { Button } from "../../components/ui/button";

export default function CrudTablePicAndLink({
  columns,

  data,
  onSubmitDelete,
  onSubmitView,
  onEdit,
}) {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
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
    <div style={{ marginTop: 20 }}>
      <input
        label="Search"
        value={searchQuery}
        className="flex rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 h-10 w-[150px] lg:w-[250px]"
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
        style={{ marginBottom: 16 }}
      />
      <DataGrid
        rows={filteredData}
        // components={{
        //   Toolbar: GridToolbar,
        // }}
        columns={columns.map((col) => ({
          ...col,
          renderCell: (params) => {
            if (col.field === "actions") {
              return (
                <>
                  <Button onClick={() => onEdit(params.row)} variant="outline">
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleView(params.row)}
                    className="ml-2"
                    variant="outline"
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => handleDelete(params.row)}
                    className="ml-2"
                  >
                    Delete
                  </Button>
                </>
              );
            }
            return params.value;
          },
        }))}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
