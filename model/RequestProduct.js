import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;
const requestProductSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: String,
    budget: Number,
    deliveryDate: Date,
    location: String,
    isUrgent: Boolean,
    preferredBrand: String,
    preferredColor: String,
    paymentMethod: String,
    contactNumber: String,
    additionalRequirements: String,
    category: {
      type: ObjectId,
      required: true,
      ref: "Category",
    },

    tags: [String],
    subCategories: [
      {
        type: ObjectId,
        ref: "subCategory",
      },
    ],
    images: [],
    maxbid: {
      type: Number,
      required: true,
      default: 10,
    },

    requestLive: {
      type: Boolean,
      default: true,
    },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    isApproved: Boolean,
    isFulfilled: Boolean,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isRecurring: Boolean,
    isCustomizable: Boolean,
    preferredMaterial: String,
    requiredCertification: String,
    specialInstructions: String,
    isPaid: Boolean,
    paymentReference: String,
    isBargainAllowed: Boolean,
    isActive: Boolean,
    isSampleRequested: Boolean,
    supplierExperience: String,
    targetPrice: Number,
    estimatedOrderFrequency: String,
    attachmentUrls: [String],
  },
  {
    timestamps: true,
  }
);

const RequestProduct =
  mongoose.models.RequestProduct ||
  mongoose.model("RequestProduct", requestProductSchema);

export default RequestProduct;
