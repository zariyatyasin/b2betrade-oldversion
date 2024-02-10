"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

export default function DetailsPageImage({ requestProductDetails }) {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = (url) => {
    setSelectedImage(url);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div>
      <div className="mt-1 text-sm text-gray-900 flex flex-wrap">
        {requestProductDetails?.map((item, id) => (
          <Image
            key={id}
            height={500}
            width={500}
            className="w-16 h-16 object-cover m-1 rounded-md border-2   cursor-pointer"
            src={item.url}
            alt=""
          />
        ))}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={selectedImage}
            alt="Selected Product Image"
            className="max-w-full max-h-96 mx-auto"
          />
        </Box>
      </Modal>
    </div>
  );
}
