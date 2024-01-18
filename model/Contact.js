import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const contactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
