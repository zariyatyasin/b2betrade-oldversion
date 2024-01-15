"use client";
// Import necessary libraries
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";

export default function CancelOrderButton({ id }) {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [cancellationValue, setCancellationValue] = useState("");

  // Function to handle opening the confirmation modal
  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  // Function to handle closing the confirmation modal
  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  // Function to handle confirming the cancellation
  const handleConfirmation = () => {
    // Make Axios POST request with the cancellation value
    // axios.post("/api/cancel-order", { id, cancellationValue })
    //   .then(response => {
    //     // Handle successful cancellation if needed
    //     console.log("Order canceled successfully!");
    //     closeConfirmationModal();
    //   })
    //   .catch(error => {
    //     // Handle error if needed
    //     console.error("Error canceling order:", error);
    //   });
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
            Are you sure you want to cancel the order? Enter cancellation value:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="cancellation-value"
            label="Cancellation Value"
            type="text"
            fullWidth
            value={cancellationValue}
            onChange={(e) => setCancellationValue(e.target.value)}
          />
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
