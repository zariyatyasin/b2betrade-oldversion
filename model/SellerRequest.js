import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const sellerRequestSchema = new mongoose.Schema({
    requestId: {
      type: ObjectId,
      ref: 'RequestProduct',
      required: true,
    },
    sellerId: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    // productName: {
    //   type: String,
    //   required: true,
    // },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    deliveryDate: Date,
    description: String,
    isAccepted: Boolean,
    isRejected: Boolean,
   
    // Add other fields as needed
  },{
    timestamps: true,
  });
  
 
const SellerRequest = mongoose.models.SellerRequest || mongoose.model("SellerRequest", sellerRequestSchema);

export default SellerRequest;