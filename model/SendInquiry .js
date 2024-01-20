import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const sendInquirySchema  = new mongoose.Schema(
  {

    quantity: {
        type: Number,
  
        min: 1,
      },
      details: {
        type: String,
        required: true,
      },
      image:[],
      productId: {
        type: ObjectId,
  
        ref: "Product",
      },
      storeId: {
        type: ObjectId,
        required: true,
        ref: "Store",
      },
      userId: {
        type: ObjectId,
        required: true,
        ref: "User",
      },
  },

  {
    timestamps: true,
  }
);

const SendInquiry =
  mongoose.models.SendInquiry || mongoose.model("SendInquiry", sendInquirySchema );

export default SendInquiry;
