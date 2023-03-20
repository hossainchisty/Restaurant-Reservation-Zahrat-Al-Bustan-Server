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
      type: String,
      required: [true, "Menu Name is required"],
    },
    price: {
      type: Float32Array,
      required: [true, "Menu Name is required"],
    },
    offer_price: {
      type: Float32Array,
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
      type: TimeRanges,
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
