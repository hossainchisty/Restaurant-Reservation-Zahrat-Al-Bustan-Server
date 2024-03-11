// Basic Lib Imports
const mongoose = require("mongoose");

// Define a schema for Menu
const MenuSchema = mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    name: {
      indexedDB: true,
      type: String,
      required: [true, "Menu Name is required"],
    },
    price: {
      type: Number,
      required: [true, "Menu Name is required"],
    },
    offer_price: {
      type: Number,
      required: false,
    },
    images: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    cooking_time: {
      type: String,
      required: [true, "Cook time is required"],
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

// Total review

// Rating

// Current price
module.exports = mongoose.model("Menu", MenuSchema);
