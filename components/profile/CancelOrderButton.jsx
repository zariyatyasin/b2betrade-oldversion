"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import axios from "axios";

export default function CancelOrderButton({ order }) {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  // Function to handle confirming the cancellation
  const handleConfirmation = async () => {
    try {
      const response = await axios.put(
        `/api/order/updatesingleorder//${order._id}`,
        {
          status: "Cancelled",
        }
      );

      closeConfirmationModal();
    } catch (error) {
      console.error("Error cancelling order:", error);
      // Handle errors, e.g., show an error message
    }
  };

  return (
    <div className="text-blue-800">
      <Button variant="outlined" onClick={openConfirmationModal}>
        Cancel Order
      </Button>
      <Dialog
        open={isConfirmationModalOpen}
        onClose={closeConfirmationModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Cancel Order?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel the order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmationModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmation} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
