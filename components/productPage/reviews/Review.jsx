import { Rating, Dialog, DialogContent, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useState } from "react";
export default function Review({ review }) {
  const { name, image } = review?.reviewBy;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };
  return (
    <div className="bg-white border-b  ">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-semibold   mr-4">
            {name.slice(0, 1)}
          </div>
          <p className="text-gray-950 text-lg">{review.review}</p>
        </div>
        {review.rating ? (
          <Rating
            name="half-rating-read"
            value={review.rating}
            precision={0.5}
            readOnly
            style={{ color: "#2B39D1" }}
          />
        ) : (
          <p>No Rating</p>
        )}
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex items-center space-x-2">
          {review.images.length > 0 &&
            review.images.map((img, index) => (
              <img
                key={index}
                src={img.secure_url}
                alt={`Review Image ${index + 1}`}
                className="w-16 h-16 rounded-md"
                onClick={() => openModal(img)}
              />
            ))}
        </div>
      </div>
      <div className="flex justify-between mt-4 mb-4">
        <div className="flex items-center">
          <span className=" text-gray-950 text-sm font-semibold">
            Delivery:
          </span>
          <span className="ml-2">{review?.delivery}</span>
        </div>
        {/* <img src={review.style.image} alt="" className="w-16 h-16" /> */}
      </div>
      <Dialog open={isModalOpen} onClose={closeModal} maxWidth="md">
        <DialogContent>
          <IconButton
            edge="end"
            color="inherit"
            onClick={closeModal}
            aria-label="close"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={selectedImage}
            alt="Selected Image"
            className="w-full h-full"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
