import { Rating } from "@mui/material";

export default function Review({ review }) {
  const { name, image } = review?.reviewBy;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-semibold text-xl mr-4">
            {name.slice(0, 1)}
          </div>
          <img src={image} alt={name} className="w-10 h-10 rounded-full" />
        </div>
        {review.rating ? (
          <Rating
            name="half-rating-read"
            value={review.rating}
            precision={0.5}
            readOnly
            style={{ color: "#facf19" }}
          />
        ) : (
          <p>No Rating</p>
        )}
      </div>
      <p className="text-gray-700 my-4">{review.review}</p>
      <div className="flex justify-between text-gray-600">
        <div className="flex items-center">
          <span className="font-semibold">Overall Fit:</span>
          <span className="ml-2">{review.fit}</span>
          <span className="mx-2">Size:</span>
          <span>{review.size}</span>
        </div>
        <img src={review.style.image} alt="" className="w-16 h-16" />
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex items-center space-x-2">
          {review.images.length > 0 &&
            review.images.map((img, index) => (
              <img
                key={index}
                src={img?.url}
                alt={`Review Image ${index + 1}`}
                className="w-16 h-16 rounded-md"
              />
            ))}
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-2">
            {review.likes && review.likes?.likes}
            like
          </div>
          <div className="text-gray-600">{review?.updatedAt?.slice(0, 10)}</div>
        </div>
      </div>
    </div>
  );
}
