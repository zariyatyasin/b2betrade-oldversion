import { Rating } from "@mui/material";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import AddReview from "./AddReview";
export default function ProductReviews({ product }) {
  const { data: session } = useSession();
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState(product.reviews);
  console.log(product.reviews);
  return (
    <div className="bg-gray-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold mb-4">
          Customer Reviews ({product.reviews.length})
        </h1>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="md:w-1/2">
            <div className="bg-white p-4 rounded-lg shadow">
              <span className="text-gray-600">Average Rating</span>
              <div className="flex items-center mt-2">
                <Rating
                  name="half-rating-read"
                  defaultValue={product.rating}
                  precision={0.5}
                  readOnly
                  className="text-yellow-500"
                />
                {product.rating === 0 ? "No review yet." : product.rating}
              </div>
            </div>
          </div>
          <div className="md:w-1/2 mt-4 md:mt-0">
            {product.ratings.map((rating, i) => (
              <div key={i} className="flex items-center space-x-2 mb-2">
                <Rating
                  name="half-rating-read"
                  defaultValue={5 - i}
                  readOnly
                  className="text-yellow-500"
                />
                <div className="w-2/3 bg-gray-300 h-3 rounded-full">
                  <div
                    style={{ width: `${rating.percentage}%` }}
                    className="bg-yellow-500 h-3 rounded-full"
                  ></div>
                </div>
                <span>{rating.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
        {session ? (
          <AddReview product={product} setReviews={setReviews} />
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-lg"
          >
            Login to add review
          </button>
        )}
        {/* <Table reviews={reviews} allSizes={product.allSizes} colors={product.colors} /> */}
      </div>
    </div>
  );
}
