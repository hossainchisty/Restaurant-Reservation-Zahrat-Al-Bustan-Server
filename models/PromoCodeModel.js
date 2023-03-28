// Basic Lib Imports
const mongoose = require("mongoose");

// Define a schema for promo codes
const PromoCodeSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    discountType: {
      type: String,
      enum: ["percentage"],
      required: false,
    },
    discountPercentage: {
      type: String,
      default: null,
    },
    maxUsage: {
      type: Number,
      default: null,
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const PromoCode = mongoose.model("PromoCode", PromoCodeSchema);

module.exports = PromoCode;
