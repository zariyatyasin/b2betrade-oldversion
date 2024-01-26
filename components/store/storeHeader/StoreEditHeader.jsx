"use client";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Images from "../../productPage/reviews/Images";
import UploadImagesClould from "../../../utils/UploadImagesClould";
import axios from "axios";
import FullScreenLoading from "../../fullScreenOverlay/FullScreenLoading";
export default function StoreEditHeader({ description, image, storeName, id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const handleEditButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const uploadedImages = await UploadImagesClould(images);

      const { data } = await axios.put(`/api/store/update/${id}`, {
        description: editedDescription,
        image: uploadedImages,
      });
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setIsModalOpen(false);
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {loading && <FullScreenLoading />}
      <div className="absolute inset-0">
        {image.length > 0 ? (
          <img
            className="w-full h-full object-cover"
            src={image[0][0]?.secure_url}
            alt=""
          />
        ) : (
          <img
            className="w-full h-full object-cover"
            src="https://res.cloudinary.com/drtexlmq7/image/upload/v1705667745/rstationProduct/el1vfsk3gzgark4zvmwq.png"
            alt=""
          />
        )}
        <div
          className="absolute inset-0 bg-gray-400 mix-blend-multiply"
          aria-hidden="true"
        />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-3xl">
          {storeName}
        </h1>
        <p className="mt-6 text-lg text-indigo-100 max-w-3xl">{description}</p>
        <button
          onClick={handleEditButtonClick}
          className="bg-blue-500 text-white px-4 py-2 mt-4"
        >
          Edit
        </button>

        <Modal
          open={isModalOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 700,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Store
            </Typography>
            <TextField
              label="Description"
              multiline
              fullWidth // Add this line to make the TextField full width
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              inputProps={{ maxLength: 240 }} // Add this line to set the maximum character length
            />

            <Images images={images} setImages={setImages} imageAllow={5} />

            <Button onClick={handleSaveChanges}>
              {loading ? "Loading..." : "Save Changes"}
            </Button>
            <Button onClick={handleModalClose}>Cancle</Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
