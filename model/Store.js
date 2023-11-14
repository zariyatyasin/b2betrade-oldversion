import mongoose from "mongoose";
import { boolean, string } from "yup";

const storeSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true,
  },
  description: String,
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
 
 
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  
    required: true,
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png",
  },
  ratings: [
    {
      rating: Number,
      review: String,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  category: {
    type:  mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  storeAtive:{
    type: String,
    default: "pending",
    enum: [
      "pending",
      "ban",
      "block",
      "active",
  
      
    ],
  },
  headerImage:{
    type: String,
     
  },  
  isVerify:{
    type: Boolean,
    default: false,
     
  },
  tags: [String],
 
  revenue: {
    type: Number,
    default: 0,
  },
  subCategories: [
    {
      type:  mongoose.Schema.Types.ObjectId,
      ref: "subCategory",
    },
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", 
    },
  ],
},{
  timestamps:true
});

 

 
const Store = mongoose.models.Store ||  mongoose.model("Store", storeSchema);

export default Store;