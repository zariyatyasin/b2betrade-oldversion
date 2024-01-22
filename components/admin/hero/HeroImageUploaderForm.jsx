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
} from "@mui/material";

import Images from "../../productPage/reviews/Images";
import UploadImagesClould from "../../../utils/UploadImagesClould";
import axios from "axios";
import FullScreenLoading from "../../fullScreenOverlay/FullScreenLoading";
const HeroImageUploaderForm = ({ data }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [imageType, setImageType] = useState("other");
  const [heroImageSide, setheroImageSide] = useState("none");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeStatus, setActiveStatus] = useState({});

  const handleToggleActive = async (id) => {
    try {
      setLoading(true);

      await axios.put(`/api/admin/hero/active/${id}`);
    } catch (error) {
      console.error("Error updating active status:", error.message);
    } finally {
      setActiveStatus((prevStatus) => ({
        ...prevStatus,
        [id]: !prevStatus[id],
      }));
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Make a DELETE request to delete the item
      // await axios.delete(`/api/your-delete-endpoint/${id}`);
      // Update the local state or trigger a callback to refetch the data
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const uploadedImages = await UploadImagesClould(images);

      const response = await axios.post("/api/admin/hero", {
        title,
        description,
        imageType,
        heroImageSide,
        images: uploadedImages,
      });

      setTitle("");
      setDescription("");
      setImageType("other");
      setheroImageSide("none");
      setImages([]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <FullScreenLoading />}
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
      <FormControl className=" ml-2">
        <InputLabel id="heroImageSide">Hero Image Side</InputLabel>
        <Select
          labelId="heroImageSide"
          id="heroImageSide"
          value={heroImageSide}
          label="heroImageSide"
          onChange={(e) => setheroImageSide(e.target.value)}
        >
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="left">Left</MenuItem>
          <MenuItem value="right">Right</MenuItem>
        </Select>
      </FormControl>

      <Box mt={2}>
        {/* Pass title and setImages to Images component */}
        <Images images={images} setImages={setImages} imageAllow={5} />
      </Box>
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Upload
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex flex-wrap gap-2">
              {item.images.map((imageArray, arrayIndex) =>
                imageArray.map((image, index) => (
                  <img
                    key={`${arrayIndex}-${index}`}
                    src={image.secure_url}
                    alt={`${item.title} - ${arrayIndex}-${index}`}
                    className="mb-2 rounded-md w-24 h-24 object-cover"
                  />
                ))
              )}
            </div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <p className="text-gray-500 mb-2">Image Type: {item.imageType}</p>
            <p className="text-gray-500 mb-4">
              Hero Image Side: {item.heroImageSide}
            </p>
            <button
              className={`bg-${
                item.active ? "green" : "red"
              }-500 text-white py-2 px-4 rounded-full`}
              onClick={() => handleToggleActive(item._id)}
            >
              {item.active ? "Active" : "Inactive"}
            </button>
            <button
              className="bg-red-500 ml-2 text-white py-2 px-4 rounded-full"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroImageUploaderForm;
