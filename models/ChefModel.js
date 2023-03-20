// Basic Lib Imports
const mongoose = require("mongoose");

// Define a schema for Chef
const ChefSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    images: [
      {
        type: String,
      },
    ],
    short_description: {
      type: String,
      required: [true, "Description is required"],
    }
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Chef", ChefSchema);
