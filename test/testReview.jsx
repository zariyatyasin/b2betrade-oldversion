/* This example requires Tailwind CSS v2.0+ */
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useState } from "react";
const reviews = {
  average: 4,
  totalCount: 1624,
  counts: [
    { rating: 5, count: 1019 },
    { rating: 4, count: 162 },
    { rating: 3, count: 97 },
    { rating: 2, count: 199 },
    { rating: 1, count: 147 },
  ],
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductReviews() {
  const [filterOptions, setFilterOptions] = useState({
    productStyle: "",
    size: "",
    color: "",
    rating: null,
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
  };

  const handleResetFilter = () => {
    setFilterOptions({
      productStyle: "",
      size: "",
      color: "",
      rating: null,
    });
  };

  const filteredFeaturedReviews = reviews.featured.filter((review) => {
    const { productStyle, size, color, rating } = filterOptions;
    if (
      (!productStyle || review.productStyle === productStyle) &&
      (!size || review.size === size) &&
      (!color || review.color === color) &&
      (!rating || review.rating >= rating)
    ) {
      return true;
    }
    return false;
  });

  return (
    <div className=" col-span-5 ">
      <div className="mb-8 p-4 border rounded-md bg-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Filter Reviews
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="productStyle" className="text-sm font-medium">
              Product Style
            </label>
            <select
              id="productStyle"
              name="productStyle"
              value={filterOptions.productStyle}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            >
              <option value="">All</option>
              {/* Add options for product styles */}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="size" className="text-sm font-medium">
              Size
            </label>
            <select
              id="size"
              name="size"
              value={filterOptions.size}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            >
              <option value="">All</option>
              {/* Add options for sizes */}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="color" className="text-sm font-medium">
              Color
            </label>
            <select
              id="color"
              name="color"
              value={filterOptions.color}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            >
              <option value="">All</option>
              {/* Add options for colors */}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="rating" className="text-sm font-medium">
              Rating
            </label>
            <select
              id="rating"
              name="rating"
              value={filterOptions.rating || ""}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            >
              <option value="">All</option>
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} stars and above
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600"
          onClick={handleResetFilter}
        >
          Reset Filter
        </button>
      </div>

      <div className="  mx-auto py-16 px-4 sm:py-24 sm:px-6   lg:py-32 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Customer Reviews
          </h2>

          <div className="mt-3 flex items-center">
            <div>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarBorderIcon
                    key={rating}
                    className={classNames(
                      reviews.average > rating
                        ? "text-yellow-400"
                        : "text-gray-300",
                      "flex-shrink-0 h-5 w-5"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{reviews.average} out of 5 stars</p>
            </div>
            <p className="ml-2 text-sm text-gray-900">
              Based on {reviews.totalCount} reviews
            </p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Review data</h3>

            <dl className="space-y-3">
              {reviews.counts.map((count) => (
                <div key={count.rating} className="flex items-center text-sm">
                  <dt className="flex-1 flex items-center">
                    <p className="w-3 font-medium text-gray-900">
                      {count.rating}
                      <span className="sr-only"> star reviews</span>
                    </p>
                    <div
                      aria-hidden="true"
                      className="ml-1 flex-1 flex items-center"
                    >
                      <StarBorderIcon
                        className={classNames(
                          count.count > 0 ? "text-yellow-400" : "text-gray-300",
                          "flex-shrink-0 h-5 w-5"
                        )}
                        aria-hidden="true"
                      />

                      <div className="ml-3 relative flex-1">
                        <div className="h-3 bg-gray-100 border border-gray-200 rounded-full" />
                        {count.count > 0 ? (
                          <div
                            className="absolute inset-y-0 bg-yellow-400 border border-yellow-400 rounded-full"
                            style={{
                              width: `calc(${count.count} / ${reviews.totalCount} * 100%)`,
                            }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </dt>
                  <dd className="ml-3 w-10 text-right tabular-nums text-sm text-gray-900">
                    {Math.round((count.count / reviews.totalCount) * 100)}%
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-900">
              Share your thoughts
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              If you’ve used this product, share your thoughts with other
              customers
            </p>

            <a
              href="#"
              className="mt-6 inline-flex w-full bg-white border border-gray-300 rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
            >
              Write a review
            </a>
          </div>
        </div>

        <div className="mt-16 lg:mt-0 lg:col-start-6 lg:col-span-7">
          <h3 className="sr-only">Recent reviews</h3>

          <div className="flow-root">
            <div className="-my-12 divide-y divide-gray-200">
              {reviews.featured.map((review) => (
                <div key={review.id} className="py-12">
                  <div className="flex items-center">
                    <img
                      src={review.avatarSrc}
                      alt={`${review.author}.`}
                      className="h-12 w-12 rounded-full"
                    />
                    <div className="ml-4">
                      <h4 className="text-sm font-bold text-gray-900">
                        {review.author}
                      </h4>
                      <div className="mt-1 flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarBorderIcon
                            key={rating}
                            className={classNames(
                              review.rating > rating
                                ? "text-yellow-400"
                                : "text-gray-300",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">{review.rating} out of 5 stars</p>
                    </div>
                  </div>

                  <div
                    className="mt-4 space-y-6 text-base italic text-gray-600"
                    dangerouslySetInnerHTML={{ __html: review.content }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
