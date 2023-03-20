// Basic Lib Imports
const mongoose = require("mongoose");
const validator = require("../services/service");

// Define a schema for Contact
const ContactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
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
    subject: {
      type: String,
      required: [true, "Subject is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    read: {
      type: Boolean,
      default: false,
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", ContactSchema);
