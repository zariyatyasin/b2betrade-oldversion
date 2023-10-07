import { Rating } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Images from "./Images";
import Select from "./Select";

export default function AddReview({ product, setReviews }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [size, setSize] = useState("");
  const [style, setStyle] = useState("");
  const [fit, setFit] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0); // Initialize the rating state with a number
  const [images, setImages] = useState([]);
  let uploaded_images = [];

  const fits = ["Small", "True to size", "Large"];

  const handleSubmit = () => {
    // Your handleSubmit logic goes here
    setLoading(true);

    // Rest of your handleSubmit logic

    setLoading(false);
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="w-full mt-4 md:mt-0">
            <div className="bg-white p-4 flex rounded-lg shadow">
              <div className="text-gray-600">Size</div>
              <Select
                property={size}
                text="Size"
                data={product.allSizes.filter((x) => x.size !== size)}
                handleChange={setSize}
              />
              <div className="text-gray-600">Style</div>
              <Select
                property={style}
                text="Style"
                data={product.colors.filter((x) => x !== style)}
                handleChange={setStyle}
              />
              <div className="text-gray-600">How does it fit</div>
              <Select
                property={fit}
                text="How does it fit"
                data={fits.filter((x) => x !== fit)}
                handleChange={setFit}
              />
            </div>
            <Images images={images} setImages={setImages} />
            <textarea
              name="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <div className="text-yellow-500 text-3xl">
              <Rating
                name="half-rating-read"
                value={rating} // Set the value prop to control the rating
                onChange={(e, newValue) => setRating(newValue)} // Use newValue from the callback
                precision={0.5}
              />
            </div>
            <button
              className={`bg-blue-500 text-white py-2 px-4 mt-4 rounded-lg ${
                loading ? "bg-gray-400 cursor-not-allowed" : ""
              }`}
              onClick={() => handleSubmit()}
              disabled={loading}
            >
              Submit Review {loading && <div>Loading</div>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
