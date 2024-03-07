// Import necessary modules
const asyncHandler = require('express-async-handler');
const PromoCode = require('../models/PromoCodeModel');

/**
 * @desc    Create a promo code
 * @route   POST /api/v1/promocode/add
 * @access  Private
 * @param   req.body - Object containing code, discountType, discountPercentage, maxUsage, and expiryDate
 * @returns Newly created promo code
 */
const addPromoCode = asyncHandler(async (req, res) => {
  const { code, discountType, discountPercentage, maxUsage, expiryDate } = req.body;

  // Validate required fields
  const requiredFields = ['code', 'discountType', 'discountPercentage', 'maxUsage', 'expiryDate'];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `${field} is required`,
      });
    }
  }

  try {
    // Create promo code
    const promo = await PromoCode.create({
      code,
      discountType,
      discountPercentage,
      maxUsage,
      expiryDate,
    });

    // Return success response
    return res.status(201).json({
      status: 201,
      success: true,
      data: promo,
      message: 'Promo code created successfully!',
    });
  } catch (error) {
    console.error(error, 'Error...........');
    throw new Error('Error creating promo code');
  }
});

module.exports = { addPromoCode };
