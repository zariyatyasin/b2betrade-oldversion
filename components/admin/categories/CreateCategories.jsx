"use client";

import CrudTable from "../../../components/Table/CrudTable";
import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import CreateForm from "../../../components/form/CreateForm";
import axios from "axios";
import { toast } from "react-toastify";
import FullScreenLoading from "../../fullScreenOverlay/FullScreenLoading";
import UploadImagesClould from "../../../utils/UploadImagesClould";
import Images from "../../productPage/reviews/Images";
export default function CreateCategories({ categories }) {
  const [data, setData] = useState(categories);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editData, setEditData] = useState({});
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const columns = [
    { field: "image", headerName: "Image", width: 300 },
    { field: "name", headerName: "Category Name", width: 300 },

    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 280,
    },
  ];
  const editableColumns = columns.filter(
    (col) => col.field !== "id" && col.field !== "actions"
  );
  const [createFormOpen, setCreateFormOpen] = useState(false);

  const handleCreateCategory = async (name) => {
    const uploadedImages = await UploadImagesClould(name.images);

    setLoading(true);
    try {
      const { data } = await axios.post("/api/admin/category", {
        name: name.name,
        image: uploadedImages[0].url,
      });

      setData(data.categories);
      toast.success(data.message);
    } catch (error) {
      setError(error);
      console.error("Error:", error.response);
      toast.error(error.response.data);
    } finally {
      setImages([]);
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
        ` /api/admin/category/${deleteItemId}`
      );

      setData(data.categories);
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
    setEditData(rowData);

    setOpenEditDialog(true);
  };

  const handleUpdateCategory = async () => {
    setLoading(true);
    const uploadedImages = await UploadImagesClould(images);

    try {
      const { data } = await axios.put(`/api/admin/category/`, {
        id: editData._id,
        name: editData.name,
        image: uploadedImages[0].url,
      });
      setData(data.categories);
      toast.success(data.message);
      setOpenEditDialog(false);
    } catch (error) {
      setError(error);
      console.error("Error:", error.response);
      toast.error(error.response.data);
    } finally {
      setImages([]);
      setLoading(false);
    }
  };

  const rowsWithIds = data?.map((row, index) => ({
    ...row,
    id: index + 1,
  }));

  return (
    <div className=" w-full">
      {loading && <FullScreenLoading />}
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
        data={rowsWithIds}
        onEdit={handleEdit}
        onSubmitDelete={(id) => handleDelete(id)}
      />

      <CreateForm
        open={createFormOpen}
        onClose={() => setCreateFormOpen(false)}
        onSubmit={handleCreateCategory}
        fields={editableColumns.map((col) => col.field)}
      />
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Row</DialogTitle>
        <DialogContent>
          {editableColumns.map((col, i) => (
            <div key={i}>
              {col.field === "name" ? (
                <TextField
                  key={col.field}
                  label={col.headerName}
                  value={editData[col.field]}
                  onChange={(e) =>
                    setEditData({ ...editData, [col.field]: e.target.value })
                  }
                />
              ) : col.field === "image" ? (
                <Images
                  key={col.field}
                  images={images}
                  setImages={setImages}
                  imageAllow={1}
                />
              ) : null}
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateCategory}>Save</Button>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

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
