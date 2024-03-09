// Basic Lib Imports
const asyncHandler = require('express-async-handler');
const Reservation = require('../models/ReservationModel');
const PromoCode = require('../models/PromoCodeModel');
const sendConfirmationEmail = require('../services/emailService');

/**
 * @desc    Get all reservations
 * @route   /api/v1/reservation/
 * @method  GET
 * @access  Private
 * @returns List of all reservations in the database
 */
const getReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.find();
  res.status(200).json({
    status: 200,
    success: true,
    data: reservation,
    message: 'Reservation fetched successfully',
  });
});

/**
 * @desc    Create a reservation for book table
 * @route   /api/v1/reservation/
 * @method  POST
 * @access  Public
 * @returns Newly created reservation
 */
const createReservation = asyncHandler(async (req, res) => {
  const reservationData = req.body;

  // If a promo code was provided, validate it
  if (reservationData.promoCode) {
    // Find the promo code in the database
    const promoCode = reservationData.promoCode;
    const now = new Date();
    try {
      const promoCodeData = await PromoCode.findOne({ code: promoCode });
      if (!promoCodeData) {
        res.status(400).json({
          status: 400,
          success: false,
          message: `Promo code ${promoCode} is invalid`,
        });
        return;
      }
      // Check if promo code has expired
      if (promoCodeData.expiryDate && promoCodeData.expiryDate < now) {
        res.status(404).json({
          status: 404,
          success: false,
          message: `Promo code ${promoCode} has expired`,
        });
        return;
      }
      // Check if promo code has reached maximum usage limit
      if (promoCodeData.usedCount >= promoCodeData.maxUsage) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: `Promo code ${promoCode} has reached its maximum usage limit`,
        });
      }

      // Set the offer field in reservationData based on promo code details
      reservationData.offer = promoCodeData.discountPercentage;

      // Increment the usedCount field in the PromoCode model
      await PromoCode.updateOne(
        { _id: promoCodeData._id },
        { $inc: { usedCount: 1 } }
      );
    } catch (error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: `Error validating promo code: ${error}`,
      });
      return;
    }
  }
  try {
    const reservation = await Reservation.create(reservationData);
    // send confirmation email to customer
    // await sendConfirmationEmail(reservation.email, reservation);

    res.status(201).json({
      status: 201,
      success: true,
      data: reservation,
      message: 'Reservation created successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error creating reservation: ${error}`,
    });
  }
});

/**
 * @desc    Update reservation
 * @route   /api/v1/reservation/:id
 * @method  PUT
 * @access  Private
 * @returns Updated reservation
 */
const updateReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) {
    res.status(404).json({
      message: 'Reservation not found',
    });
  }

  const updatedReservation = await Reservation.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedReservation);
});

/**
 * @desc    Delete Reservation
 * @route   /api/v1/reservation/:id
 * @method  DELETE
 * @access  Private
 * @returns Deleted reservation
 */
const deleteReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) {
    res.status(404).json({
      message: 'Reservation not found!',
    });
  }

  const deletedReservation = await Reservation.findByIdAndRemove(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({
    data: deletedReservation,
    id: req.params.id,
    message: 'Reservation were deleted.',
  });
});

module.exports = {
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
};
