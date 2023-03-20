// Basic Lib Imports
const mongoose = require("mongoose");

// Define a schema for Category
const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", CategorySchema);
