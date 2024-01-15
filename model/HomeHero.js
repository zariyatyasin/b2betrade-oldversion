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
    images: [],
    imageType: {
      type: String,
      enum: ["hero", "middle", "other"],
      default: "other",
    },
    heroImageSide: {
      type: String,
      enum: ["left", "right","none"],
      default: "none",
    },
    active: {
      type: Boolean,
      default: false,
    },
     
   
  },
  {
    timestamps: true,
  }
);

const HomeHero =
  mongoose.models.HomeHero || mongoose.model("HomeHero", HomeHeroSchema);

export default HomeHero;
