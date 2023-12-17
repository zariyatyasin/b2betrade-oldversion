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
import { Button } from "../../ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import FullScreenLoading from "../../fullScreenOverlay/FullScreenLoading";

import CreateCouponForm from "../../form/CreateCouponForm";
import ViewCouponDetails from "../../viewDetails/ViewCouponDetails";
import CrudTable from "../../Table/CrudTable";
export default function CreateCoupon({ categories, coupon }) {
  const [data, setData] = useState(coupon);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editData, setEditData] = useState({});
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const columns = [
    { field: "coupon", headerName: "Coupon Code", width: 130 },
    { field: "startDate", headerName: "start Date", width: 100 },
    { field: "endDate", headerName: "End Date", width: 100 },
    { field: "discount", headerName: "Discount", width: 80 },

    { field: "minAmount", headerName: "Minimum Amount", width: 150 },
    { field: "isActive", headerName: "Active", width: 100, Boolean: true },
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
    // setSelectedCoupon(coupon.find((item) => couponId == item._id));
    setSelectedCouponID(couponId);

    setViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
    setSelectedCouponID(null);
  };
  const handleSubmitForm = async (formData) => {
    setLoading(true);

    try {
      if (formData.action === "edit") {
        console.log(formData.values);
        const { data } = await axios.put("http://localhost:3000/api/coupon", {
          id: formData.editId,
          ...formData.values,
        });

        setData(data.coupon);
        toast.success(data.message);
      } else {
        // Create operation
        const { data } = await axios.post(
          "http://localhost:3000/api/coupon",
          formData.values
        );
        console.log(data.coupon);
        setData(data.coupon);
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
      const { data } = await axios.delete(`/api/coupon/${deleteItemId}`);

      setData(data.coupon);
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
  }));

  return (
    <div className=" ">
      {loading && <FullScreenLoading />}
      <Button
        className=" bg-gray-950 text-white  "
        onClick={() => setCreateFormOpen(true)}
      >
        Create Copuon
      </Button>
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

      <CreateCouponForm
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
      <ViewCouponDetails
        open={viewDialogOpen}
        onClose={handleCloseViewDialog}
        couponId={selectedCouponID}
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
