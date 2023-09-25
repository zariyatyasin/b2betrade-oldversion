import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  address: String,
  city: String,
  country: String,
  logo: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  
    required: true,
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
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
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