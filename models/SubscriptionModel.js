// Basic Lib Imports
const mongoose = require("mongoose");
const validator = require('../services/service')

// Define a schema for Subscription
const SubscriptionSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "This field is required. Please input a valid email."],
      unique: true,
      lowercase: true,
      validate: (value) => {
        if (!validator(value)) {
          throw new Error("Invalid email address");
        }
      },
    },
    subscribed_date: {
      type: Date,
      default: new Date()
    }
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Subscription", SubscriptionSchema);
