import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const HomeHeroSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    imageUrl: [{
      title:String,
      url:String
    }],
    imageType: {
      type: String,
      enum: ["hero", "middle", "other"],
      default: "other",
    },
     
   
  },
  {
    timestamps: true,
  }
);

const HomeHero =
  mongoose.models.HomeHero || mongoose.model("HomeHero", HomeHeroSchema);

export default HomeHero;
