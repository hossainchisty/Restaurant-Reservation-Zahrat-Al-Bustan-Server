// Basic Lib Imports
const mongoose = require("mongoose");
const validator = require("../services/service");

// Define a schema for User
const UserSchema = mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, "Please add a name"],
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
    address: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    token: {
      type: String,
      default: "",
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
