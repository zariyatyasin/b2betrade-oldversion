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
  images: [String],  
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
  isBargainAllowed: Boolean,  
  isActive: Boolean,  
  isSampleRequested: Boolean,  
  supplierExperience: String,  
  targetPrice: Number,  
  estimatedOrderFrequency: String, // How often the buyer plans to place orders
  attachmentUrls: [String], // URLs to additional attachments or documents
  // Add other fields as needed
});

 
const RequestProduct = mongoose.models.RequestProduct || mongoose.model("RequestProduct", requestProductSchema);

export default RequestProduct;