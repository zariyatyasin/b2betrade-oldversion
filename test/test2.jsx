import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

export default function CreateSubCategoryForm({
  open,
  onClose,
  onSubmit,
  fields,
  selectFromInput,
}) {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field] = "";
      return acc;
    }, {})
  );

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (event, field) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = () => {
    const selectedCategoryObject = selectFromInput.find(
      (category) => category.name === selectedCategory
    );

    if (selectedCategoryObject) {
      // Use selectedCategoryObject._id in your submission logic
      onSubmit({
        ...formData,
        categoryId: selectedCategoryObject._id,
      });

      setFormData(
        fields.reduce((acc, field) => {
          acc[field] = "";
          return acc;
        }, {})
      );

      setSelectedCategory("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Category</DialogTitle>
      <DialogContent>
        <Select
          label="Category"
          value={selectedCategory}
          onChange={handleCategorySelect}
        >
          {selectFromInput.map((category) => (
            <MenuItem key={category._id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        {fields.map((field) => (
          <TextField
            key={field}
            label={field}
            value={formData[field]}
            onChange={(e) => handleChange(e, field)}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Save</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}






"use client";

import CrudTable from "@/components/Table/CrudTable";
import React, { useState } from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

import axios from "axios";
import { toast } from "react-toastify";
import FullScreenLoading from "@/components/loading/FullScreenLoading";
import CreateSubCategoryForm from "@/components/form/CreateSubCategoryForm";
export default function CreateSubCategory({ categories, subcategories }) {
  const [data, setData] = useState(subcategories);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editData, setEditData] = useState({});
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  console.log(categories);

  const columns = [
    { field: "name", headerName: "Subcategory Name", width: 130 },
    { field: "parent.name", headerName: "Parent Category", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 150,
    },
  ];
  const editableColumns = columns.filter(
    (col) => col.field !== "id" && col.field !== "actions"
  );
  const [createFormOpen, setCreateFormOpen] = useState(false);

  //create categories
  const handleCreateCategory = async (data) => {
    console.log("this is data", data);
    // setLoading(true);
    // try {
    //   const { data } = await axios.post("/api/admin/subcategory", {
    //     name: data.name,
    //     parent: data.categoryId,
    //   });

    //   setData(data.categories);
    //   toast.success(data.message);
    // } catch (error) {
    //   setError(error);
    //   console.error("Error:", error);
    //   // toast.error(error.response.data);
    // } finally {
    //   setLoading(false);
    // }
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
        `http://localhost:3000/api/admin/category/${deleteItemId}`
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
    console.log(editData);
    // setLoading(true);
    // try {
    //   const { data } = await axios.put(
    //     `http://localhost:3000/api/admin/category/`,
    //     {
    //       id: editData._id,
    //       name: editData.name,
    //     }
    //   );
    //   setData(data.categories);
    //   toast.success(data.message);
    //   setOpenEditDialog(false);
    // } catch (error) {
    //   setError(error);
    //   console.error("Error:", error.response);
    //   toast.error(error.response.data);
    // } finally {
    //   setLoading(false);
    // }
  };
  const rowsWithIds = data.map((row, index) => ({
    ...row,
    id: index + 1,
    "parent.name": row.parent.name,
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

      <CreateSubCategoryForm
        open={createFormOpen}
        onClose={() => setCreateFormOpen(false)}
        onSubmit={handleCreateCategory}
        categories={categories}
        fields={editableColumns.map((col) => col.field)}
      />
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Row</DialogTitle>
        <DialogContent>
          <TextField
            label="Subcategory Name"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          />
          {editableColumns.map((col) => {
            if (col.field === "parent.name") {
              return editData.parent ? (
                <Select
                  key={col.field}
                  label={col.headerName}
                  value={editData.parent.name}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      parent: { ...editData.parent, name: e.target.value },
                    })
                  }
                >
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              ) : null;
            }
          })}
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
