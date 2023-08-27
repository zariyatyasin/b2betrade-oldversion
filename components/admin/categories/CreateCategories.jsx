"use client";

import CrudTable from "@/components/Table/CrudTable";
import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import CreateForm from "@/components/form/CreateForm";
export default function CreateCategories({ categories }) {
  const [data, setData] = useState(categories);
  const columns = [
    { field: "name", headerName: "Category Name", width: 130 },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      width: 90,
    },

    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 150,
    },
  ];
  const editableColumns = columns.filter(
    (col) =>
      col.field !== "id" && col.field !== "lastName" && col.field !== "actions"
  );
  const [createFormOpen, setCreateFormOpen] = useState(false);

  const handleCreateCategory = (newCategory) => {
    setData([...categories, newCategory]);
  };

  console.log({ data, createFormOpen });
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setCreateFormOpen(true)}
      >
        Create
      </Button>
      <CrudTable
        columns={columns}
        editableColumns={editableColumns}
        data={data}
      />

      <CreateForm
        open={createFormOpen}
        onClose={() => setCreateFormOpen(false)}
        onSubmit={handleCreateCategory}
        fields={editableColumns.map((col) => col.field)}
      />
    </div>
  );
}
