// Import necessary modules and models
import { Rating } from "@mui/material";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import AddReview from "./AddReview";
import Table from "./Table";

// Function to display product reviews
export default function ProductReviews({ product }) {
  const { data: session } = useSession();
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState(product?.reviews);

  return (
    <div className="bg-white mt-4 rounded-md p-4  ">
      <div className=" ">
        <h1 className="text-xl font-semibold mb-4">
          Customer Reviews ({product?.reviews.length})
        </h1>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="md:w-1/2">
            <div className="  ">
              <div className="  mt-2">
                <div className=" mb-5 font-bold text-xl ">
                  {" "}
                  {product?.rating === 0 ? "No review yet." : product?.rating}
                </div>

                <Rating
                  name="half-rating-read"
                  defaultValue={product?.rating}
                  precision={0.5}
                  readOnly
                  style={{ color: "#2B39D1" }}
                />
              </div>
            </div>
          </div>
          <div className="md:w-1/2 mt-4 md:mt-0">
            {product?.ratings.map((rating, i) => (
              <div key={i} className="flex items-center space-x-2 mb-2">
                <Rating
                  name="half-rating-read"
                  defaultValue={5 - i}
                  readOnly
                  style={{ color: "#2B39D1" }}
                />
                <div className="w-2/3 bg-gray-300 h-2 rounded-full">
                  <div
                    style={{
                      width: rating.percentage && `${rating.percentage}%`,
                    }}
                    className="bg-[#2B39D1] h-2 rounded-full"
                  ></div>
                </div>
                <span>{rating.percentage || "0"}%</span>
              </div>
            ))}
          </div>
        </div>
        {session?.user.role === "admin" && (
          <AddReview product={product} setReviews={setReviews} />
        )}
      </div>
      {/* <div className="mt-4">
        <Table
          reviews={reviews}
          allSizes={product.allSizes}
          colors={product.colors}
        />
      </div> */}
    </div>
  );
}
