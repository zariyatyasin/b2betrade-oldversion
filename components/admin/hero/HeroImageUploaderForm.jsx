"use client";
import React, { useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const HeroImageUploaderForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [imageType, setImageType] = useState("other");

  const onSubmit = (formData) => {
    console.log("Form data submitted:", formData);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleDelete = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("imageType", imageType);

    files.forEach((file, index) => {
      formData.append(`image_${index + 1}`, file);
    });

    console.log(formData);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <FormControl>
        <InputLabel id="imageTypeLabel">Image Type</InputLabel>
        <Select
          labelId="imageTypeLabel"
          id="imageType"
          value={imageType}
          label="Image Type"
          onChange={(e) => setImageType(e.target.value)}
        >
          <MenuItem value="hero">Hero</MenuItem>
          <MenuItem value="middle">Middle</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        multiple
        required
      />
      <Box mt={2}>
        {files.map((file, index) => (
          <Box key={index} display="flex" alignItems="center">
            <img
              src={URL.createObjectURL(file)}
              alt={`Preview-${index}`}
              style={{ width: "100px", marginRight: "10px" }}
            />
            <IconButton color="secondary" onClick={() => handleDelete(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Button type="submit" variant="contained" color="primary">
        Upload
      </Button>
    </form>
  );
};

export default HeroImageUploaderForm;
