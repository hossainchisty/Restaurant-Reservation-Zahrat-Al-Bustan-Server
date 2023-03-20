// Basic Lib Imports
const mongoose = require("mongoose");

// Define a schema for OrderSchema
const OrderSchema = mongoose.Schema(
  {
    total_price: {
      type: Number,
      required: [true, "Total price is required"],
    },
    tax: {
      type: Number,
      required: [true, "Tax is required"],
    },
    is_paid: {
      type: Boolean,
      default: false,
    },
    is_served: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
