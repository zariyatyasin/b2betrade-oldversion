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
import Images from "../../productPage/reviews/Images";

const HeroImageUploaderForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [imageType, setImageType] = useState("other");
  const [images, setImages] = useState([]);

  const onSubmit = (formData) => {
    console.log("Form data submitted:", formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { title, description, imageType, images };

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

      <Box mt={2}>
        {/* Pass title and setImages to Images component */}
        <Images images={images} setImages={setImages} imageAllow={5} />
      </Box>
      <Button type="submit" variant="contained" color="primary">
        Upload
      </Button>
    </form>
  );
};

export default HeroImageUploaderForm;
