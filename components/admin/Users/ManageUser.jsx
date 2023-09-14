"use client";

import React, { useState } from "react";
import CrudTable from "../../Table/CrudTable";

export default function ManageUser({ users }) {
  console.log(users);
  const [data, setData] = useState(users);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editData, setEditData] = useState({});
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const columns = [
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "role", width: 100 },

    {
      field: "emailVerified",
      headerName: "EmailVerified",
      width: 200,
      Boolean: true,
    },
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

  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selecteduser, setSelecteduser] = useState(null);
  const [selecteduserID, setSelecteduserID] = useState(null);

  const handleView = (userId) => {
    setViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
    setSelecteduserID(null);
  };
  const handleSubmitForm = async (formData) => {
    setLoading(true);

    try {
      if (formData.action === "edit") {
      } else {
      }
    } catch (error) {
      console.error("Error creating/editing category:", error);
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
  }));
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className=" w-full ">
        <CrudTable
          columns={columns}
          editableColumns={editableColumns}
          data={rowsWithIds}
          onEdit={handleEdit}
          onSubmitDelete={(id) => handleDelete(id)}
          onSubmitView={(id) => handleView(id)}
        />
      </div>
    </div>
  );
}
