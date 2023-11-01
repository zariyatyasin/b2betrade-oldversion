import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

export default function CreateForm({
  open,
  onClose,
  onSubmit,
  fields,
  selecetFromIput,
}) {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field] = "";
      return acc;
    }, {})
  );

  const handleChange = (event, field) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData(
      fields.reduce((acc, field) => {
        acc[field] = "";
        return acc;
      }, {})
    );
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Category</DialogTitle>
      <DialogContent>
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
