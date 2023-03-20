// Basic Lib Imports
const mongoose = require("mongoose");

// Define a schema for Orderitem
const orderItemSchema = mongoose.Schema(
  {
    quantity: {
      type: Number,
      required: [true, "Title is required"],
    },
    price: {
      type: Float32Array,
      required: [true, "Price is required"],
    },
    name: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    menu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("OrderItem", orderItemSchema);
