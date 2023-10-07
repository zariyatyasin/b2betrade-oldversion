import {
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography, // Add Typography from MUI
} from "@mui/material";
import { useState } from "react";
import usePagination from "./Pagination";
import Review from "./Review";

export default function Table({ reviews, allSizes, colors }) {
  const [page, setPage] = useState(1);

  const [selectedRating, setSelectedRating] = useState(0); // Initialize with 0 to show all ratings
  const PER_PAGE = 3;
  const filteredReviews = reviews.filter((review) => {
    const ratingFilter =
      selectedRating === 0 || review.rating === selectedRating;
    return ratingFilter;
  });

  const count = Math.ceil(filteredReviews.length / PER_PAGE);
  const _DATA = usePagination(filteredReviews, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  return (
    <div>
      <div className="mb-4">
        <FormControl variant="outlined" size="small" className="ml-2">
          <InputLabel>Rating</InputLabel>
          <Select
            label="Rating"
            value={selectedRating}
            onChange={handleRatingChange}
          >
            <MenuItem value={0}>All</MenuItem>
            {[1, 2, 3, 4, 5].map((rating, index) => (
              <MenuItem key={index} value={rating}>
                {rating}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {filteredReviews.length === 0 ? ( // Check if there are no reviews after filtering
        <Typography variant="h6">No Reviews</Typography>
      ) : (
        <div>
          {_DATA.currentData().map((review, i) => (
            <Review review={review} key={i} />
          ))}
          <div>
            <Pagination
              count={count}
              page={page}
              variant="round"
              shape="rounded"
              onChange={handleChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}
