// Basic Lib Imports
const mongoose = require("mongoose");

// Define a schema for users
const userSchema = mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "This field is required. Please input a valid email."],
      unique: true,
      lowercase: true,
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      },
    },
    phone_number: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^(\+\d{1,3}[- ]?)?\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    time: {
      type: TimeRanges,
      required: [true, "Time is required."],
    },
    branch: {
      type: String,
    },
    guests: {
      type: Number,
      required: true,
      default: 1,
    },
    occasion: {
      type: String,
    },
    seating_preference: {
      type: String,
      enum: ["Family Seating", "Single"],
    },
    promoCode: {
      type: Schema.Types.ObjectId,
      ref: "PromoCode",
      default: null,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
