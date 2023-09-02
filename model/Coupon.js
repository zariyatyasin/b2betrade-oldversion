import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const couponSchema = new mongoose.Schema(
  {
    coupon: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: true,
      minLength: 4,
      maxLength: 10,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    minAmount: {
      type: Number,
      required: true,
       
    },
    maxUsesTotal: {
      type: Number,
    },
    maxUsesPerUser: {
      type: Number,
    },
 
    applicableProducts: [{
      type: ObjectId,
      ref: "Product",
    }],
    applicableCategories: [{
      type: ObjectId,
      ref: "Category",
    }],
    redemptionHistory: [{
      user: {
        type: ObjectId,
        ref: "User",
      },
      redeemedAt: {
        type: Date,
        default: Date.now,
      },
    }],
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);

export default Coupon;