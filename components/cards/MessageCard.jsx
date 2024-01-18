"use client";
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import axios from "axios";
const cardStyle = {
  padding: "16px",
  marginBottom: "16px",
  display: "flex",
  flexDirection: "column",
};

const buttonStyle = {
  marginTop: "8px",
};

export default function MessageCard({ message }) {
  const { fullName, phone, message: content, createdAt } = message;
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);

      const response = await axios.delete(`/api/contact/${message._id}`);

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} style={cardStyle}>
      <Typography variant="subtitle1">
        <strong>Name:</strong> {fullName}
      </Typography>
      <Typography variant="subtitle1">
        <strong>Phone Number:</strong> {phone}
      </Typography>
      <Typography variant="subtitle1">
        <strong>Message:</strong> {content}
      </Typography>
      <Typography variant="subtitle1">
        <strong>Created At:</strong> {new Date(createdAt).toLocaleString()}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        style={buttonStyle}
        onClick={handleDelete}
      >
        {loading ? "Deleting..." : "Delete"}
      </Button>
    </Paper>
  );
}
