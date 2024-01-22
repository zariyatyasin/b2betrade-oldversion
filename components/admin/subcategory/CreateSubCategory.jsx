"use client";

import CrudTable from "../../../components/Table/CrudTable";
import React, { useState } from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { Button } from "../../../components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import FullScreenLoading from "../../fullScreenOverlay/FullScreenLoading";
import CreateSubCategoryForm from "../../../components/form/CreateSubCategoryForm";
export default function CreateSubCategory({ categories, subcategories }) {
  const [data, setData] = useState(subcategories);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editData, setEditData] = useState({});
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const handleView = async (id) => {
    onSubmitView(id._id);
  };
  const columns = [
    { field: "name", headerName: "Subcategory Name", width: 200 },
    { field: "parent.name", headerName: "Parent Category", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 250,
    },
  ];
  const editableColumns = columns.filter(
    (col) => col.field !== "id" && col.field !== "actions"
  );
  const [createFormOpen, setCreateFormOpen] = useState(false);

  //create categories
  const handleSubmitForm = async (formData) => {
    setLoading(true);

    try {
      if (formData.action === "edit") {
        const { data } = await axios.put("/api/admin/subcategory", {
          id: formData.id,
          name: formData.name,
          parent: formData.categoryId,
        });

        setData(data.subcategories);
        toast.success(data.message);
      } else {
        // Create operation
        const { data } = await axios.post("/api/admin/subcategory", {
          name: formData.name,
          parent: formData.categoryId,
        });

        setData(data.subcategories);
        toast.success(data.message);
      }
    } catch (error) {
      console.error("Error creating/editing category:", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = (id) => {
    setDeleteItemId(id);
    setDeleteConfirmationOpen(true);
  };
  const handleConfirmDelete = async () => {
    setLoading(true);
    setDeleteConfirmationOpen(false);

    try {
      const { data } = await axios.delete(
        `/api/admin/subcategory/${deleteItemId}`
      );

      setData(data.subcategories);
      toast.success(data.message);
    } catch (error) {
      setError(error);
      console.error("Error:", error.response);
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (rowData) => {
    setEditData({ ...rowData, action: "edit" });

    setOpenEditDialog(true);
  };

  const rowsWithIds = data?.map((row, index) => ({
    ...row,
    id: index + 1,
    "parent.name": row.parent.name,
  }));

  return (
    <div className=" w-full">
      {loading && <FullScreenLoading />}
      <Button
        className=" bg-gray-950 text-white  "
        onClick={() => setCreateFormOpen(true)}
      >
        Create SubCategory
      </Button>
      <CrudTable
        columns={columns}
        editableColumns={editableColumns}
        data={rowsWithIds}
        onEdit={handleEdit}
        onSubmitDelete={(id) => handleDelete(id)}
        onSubmitView={(id) => handleView(id)}
      />

      <CreateSubCategoryForm
        open={createFormOpen || openEditDialog}
        onClose={() => {
          setCreateFormOpen(false);
          setOpenEditDialog(false);
          setEditData({});
        }}
        onSubmits={handleSubmitForm}
        categories={categories}
        editData={editData}
        fields={editableColumns.map((col) => col.field)}
      />

      <Dialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDelete} color="primary">
            Yes
          </Button>
          <Button
            onClick={() => {
              setDeleteConfirmationOpen(false);
              setDeleteItemId(null);
            }}
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
