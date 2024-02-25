import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: '"Please enter a password.',
    },
    role: {
      type: String,
      default: "user",
      enum: [
        "admin",
        "subadmin",
        "supplier",
        "manufacturer",
        "retailer",
        "user",
      ],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Category",
    },
    storeName: {
      type: String,
    },
    ShopAddress: {
      type: String,
    },
    ShopLocation: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/drtexlmq7/image/upload/v1705422895/rstationProduct/zwic8xk7tsbo3ipi8npe.png",
    },
    verified: {
      type: String,
      default: "pending",
      enum: ["pending", "ban", "block", "active"],
    },

    defaultPaymentMethod: {
      type: String,
      default: "",
    },
    address: [
      {
        fullName: {
          type: String,
        },

        phoneNumber: {
          type: String,
        },
        address1: {
          type: String,
        },
        address2: {
          type: String,
        },
        city: {
          type: String,
        },
        street: {
          type: String,
        },
        state: {
          type: String,
        },
        country: {
          type: String,
        },
        active: {
          type: Boolean,
          default: false,
        },
      },
    ],
    wishlist: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        style: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//If the User collection does not exist create a new one.

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
