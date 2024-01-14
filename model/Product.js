import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const reviewSchema = new mongoose.Schema({
  reviewBy: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  review: {
    type: String,
    required: true,
  },
  size: {
    type: String,
  },
  style: {
    color: String,
    image: String,
  },
  delivery: {
    type: String,
  },
  images: [],
  likes: [],
});
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      enum: ["B2B", "B2C"],
    },
    bulkPricing: [
      {
        minQty: Number,
        maxQty: Number,
        price: Number,
      },
    ],

    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      //lowercase: true,
    },
    storeId: {
      type: ObjectId,
      required: true,
      ref: "Store",
    },
    category: {
      type: ObjectId,
      required: true,
      ref: "Category",
    },
    // Array of tags for categorizing products (e.g., ["new", "sale", "featured"])
    tags: [String],
    subCategories: [
      {
        type: ObjectId,
        ref: "subCategory",
      },
    ],
    details: [
      {
        name: String,
        value: String,
      },
    ],
    questions: [
      {
        question: String,
        answer: String,
      },
    ],
    reviews: [reviewSchema],
    refundPolicy: {
      type: String,
      default: "30 days",
    },
    features: {
      type: String,
      default: "30 days",
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    productAtive: {
      type: String,
      default: "pending",
      enum: ["pending", "ban", "block", "active"],
    },
    discount: {
      type: Number,
      default: 0,
    },
    section: {
      type: String,
      enum: [
        "big deal",
        "featured",
        "new arrival",
        "sale",
        "clearance",
        "bestseller",
        "limited edition",
        "top rated",
        "regular",
      ],
      default: "regular",
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    shipping: {
      type: Number,
      required: true,
      default: 0,
    },
    description_images: [],
    subProducts: [
      {
        sku: String,
        images: [],

        color: {
          color: {
            type: String,
          },
          image: {
            type: String,
          },
        },
        sizes: [
          {
            size: String,
            qty: Number,
            bulkPricing: [
              {
                minQty: Number,
                maxQty: Number,
                price: Number,
              },
            ],
          },
        ],

        sold: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
