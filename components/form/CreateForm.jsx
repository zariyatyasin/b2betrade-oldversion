import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import Images from "../productPage/reviews/Images";

export default function CreateForm({
  open,
  onClose,
  onSubmit,
  fields,
  selecetFromIput,
}) {
  const [images, setImages] = useState([]);
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
    const formDataWithImages = { ...formData, images };
    onSubmit(formDataWithImages);
    setFormData(
      fields.reduce((acc, field) => {
        acc[field] = "";
        return acc;
      }, {})
    );
    setImages([]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Category</DialogTitle>
      <DialogContent>
        {fields.map((field) =>
          field === "image" ? (
            <Images
              key={field}
              images={images}
              setImages={setImages}
              imageAllow={5}
            />
          ) : (
            <TextField
              key={field}
              label={field}
              value={formData[field]}
              onChange={(e) => handleChange(e, field)}
            />
          )
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Save</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
