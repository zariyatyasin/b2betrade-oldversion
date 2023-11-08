import mongoose from "mongoose";
import { string } from "yup";

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
    default: "pendding",
    enum: [
      "pendding",
      "ban",
      "block",
      "active",
  
      
    ],
  },
  tags: [String],
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
});

 

 
const Store = mongoose.models.Store ||  mongoose.model("Store", storeSchema);

export default Store;