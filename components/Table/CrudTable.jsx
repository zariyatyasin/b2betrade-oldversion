import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
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

export default function CrudTable({
  columns,
  editableColumns,
  data,
  onSubmitDelete,
  onEdit,
}) {
  const [open, setOpen] = React.useState(false);
  const [editData, setEditData] = React.useState(initialEditData);

  const handleDelete = async (id) => {
    onSubmitDelete(id);
  };

  const handleSave = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    setEditData(initialEditData);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        components={{
          Toolbar: GridToolbar,
        }}
        columns={columns.map((col) => ({
          ...col,
          renderCell: (params) => {
            if (col.field === "actions") {
              return (
                <>
                  <Button onClick={() => onEdit(params.row)}>Edit</Button>
                  <Button onClick={() => handleDelete(params.row.id)}>
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
