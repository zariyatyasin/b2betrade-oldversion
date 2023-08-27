import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const initialEditData = {
  id: null,
  firstName: "",
  lastName: "",
  age: "",
};

export default function CrudTable({ columns, editableColumns, data }) {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(initialEditData);
  const [editedRowIndex, setEditedRowIndex] = useState(null);
  let [rows, setRows] = useState(data);
  rows = data?.map((data, index) => ({
    ...data,
    id: index + 1,
  }));
  const handleEdit = (rowData) => {
    setOpen(true);
    setEditData(rowData);
    setEditedRowIndex(rowData.id);
  };

  const handleDelete = (rowData) => {
    // Implement your delete logic here
    const updatedRows = rows.filter((row) => row.id !== rowData.id);
    setRows(updatedRows);
  };

  const handleSave = () => {
    // Implement your update logic here
    const updatedRows = rows.map((row) =>
      row.id === editData.id ? { ...editData } : row
    );
    setRows(updatedRows);
    setOpen(false);
    setEditData(initialEditData);
    setEditedRowIndex(null);
  };

  const handleCancel = () => {
    setOpen(false);
    setEditData(initialEditData);
    setEditedRowIndex(null);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns.map((col) => ({
          ...col,
          renderCell: (params) => {
            if (col.field === "actions") {
              return (
                <>
                  <Button onClick={() => handleEdit(params.row)}>Edit</Button>
                  <Button onClick={() => handleDelete(params.row)}>
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
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Edit Row</DialogTitle>
        <DialogContent>
          {editableColumns.map((col) => (
            <TextField
              key={col.field}
              label={col.headerName}
              value={editData[col.field]}
              onChange={(e) =>
                setEditData({ ...editData, [col.field]: e.target.value })
              }
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
