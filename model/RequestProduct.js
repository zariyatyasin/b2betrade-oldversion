import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;
const requestProductSchema = new mongoose.Schema({
  userId: {
    type:ObjectId,
    ref: 'User',
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
  tags: [String],
  images: [String], // Array of image URLs
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
  // Additional fields
  isRecurring: Boolean,
  isCustomizable: Boolean,
  preferredMaterial: String,
  requiredCertification: String,
  specialInstructions: String,
  isPaid: Boolean,
  paymentReference: String,
  // More fields
  isBargainAllowed: Boolean, // Indicates if the buyer is open to negotiate prices
  isSampleRequested: Boolean, // Indicates if the buyer wants a sample before placing a bulk order
  supplierExperience: String, // Desired level of experience from the supplier
  targetPrice: Number, // Specific price the buyer is aiming for
  estimatedOrderFrequency: String, // How often the buyer plans to place orders
  attachmentUrls: [String], // URLs to additional attachments or documents
  // Add other fields as needed
});

 
const RequestProduct = mongoose.models.RequestProduct || mongoose.model("RequestProduct", requestProductSchema);

export default RequestProduct;