// Basic Lib Imports
const mongoose = require("mongoose");

// Define a schema for Review
const ReviewSchema = mongoose.Schema(
  {
    menu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rating: {
      type: String,
      required: [true, "Rating is required"],
    },
    
    comment: {
      type: String,
      required: [true, "Comment is required"],
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", ReviewSchema);
