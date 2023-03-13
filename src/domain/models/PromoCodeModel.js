// Basic Lib Imports
const mongoose = require('mongoose');

// Define a schema for promo codes
const PromoCodeSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'amount'],
    required: true
  },
  discountValue: {
    type: Number,
    required: true
  },
  maxUses: {
    type: Number,
    default: null
  },
  usedCount: {
    type: Number,
    default: 0
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// Create a model for promo codes
const PromoCode = mongoose.model('PromoCode', PromoCodeSchema);

module.exports = PromoCode;
