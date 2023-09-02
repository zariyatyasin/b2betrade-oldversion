"use client";

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
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import FullScreenLoading from "@/components/loading/FullScreenLoading";
import CreateSubCategoryForm from "@/components/form/CreateSubCategoryForm";
import CreateCouponForm from "@/components/form/CreateCouponForm";
import ViewCouponDetails from "@/components/viewDetails/ViewCouponDetails";
import CrudTablePicAndLink from "@/components/Table/CrudTablePicAndLink";

export default function AllProductList({ products }) {
  console.log(products);

  const [data, setData] = useState(products);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editData, setEditData] = useState({});
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const columns = [
    { field: "name", headerName: "Coupon Code", width: 250 },
    {
      field: "category.name",
      headerName: "Category",
      sortable: false,
      width: 200,
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
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [selectedCouponID, setSelectedCouponID] = useState(null);

  const handleView = (couponId) => {
    setSelectedCouponID(couponId);

    setViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
    setSelectedCouponID(null);
  };
  const handleSubmitForm = async (formData) => {
    setLoading(true);
  };
  const handleDelete = (id) => {
    setDeleteItemId(id);
    setDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    setDeleteConfirmationOpen(false);
  };
  const handleEdit = (rowData) => {
    setEditData({ ...rowData, action: "edit" });

    setOpenEditDialog(true);
  };

  const rowsWithIds = data?.map((row, index) => ({
    ...row,
    id: index + 1,
    "category.name": row.category.name,
  }));

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <CrudTablePicAndLink
        columns={columns}
        editableColumns={editableColumns}
        data={rowsWithIds}
        onEdit={handleEdit}
        onSubmitDelete={(id) => handleDelete(id)}
        onSubmitView={(id) => handleView(id)}
      />
    </div>
  );
}
