// Basic Lib Imports
const mongoose = require("mongoose");

// Define a schema for Campaign
const CampaignSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    images: [
      {
        type: String,
      },
    ],
    start_date: {
      type: Date,
      required: [true, "Start date is required"],
    },
    end_date: {
      type: Date,
      required: [true, "End date is required."],
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Campaign", CampaignSchema);
