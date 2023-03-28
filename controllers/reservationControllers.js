// Basic Lib Imports
const asyncHandler = require("express-async-handler");
const Reservation = require("../models/ReservationModel");
const PromoCode = require("../models/PromoCodeModel");
const sendConfirmationEmail = require("../services/emailService");

// @desc    Get reservation
// @route   GET /api/reservation
// @access  Private
const getReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.find();
  res.status(200).json(reservation);
});

// @desc    Create a reservation for book table
// @route   POST /api/reservation
// @access  Public
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
          success: false,
          message: `Promo code ${promoCode} is invalid`,
        });
        return;
      }
      // Check if promo code has expired
      if (promoCodeData.expiryDate && promoCodeData.expiryDate < now) {
        res.status(400).json({
          success: false,
          message: `Promo code ${promoCode} has expired`,
        });
        return;
      }
      // Check if promo code has already been used
      const promoCodeUsageCount = await Reservation.countDocuments({
        promoCode: promoCode,
      });
      if (promoCodeUsageCount >= promoCodeData.maxUsage) {
        res.status(400).json({
          success: false,
          message: `Promo code ${promoCode} has already been used`,
        });
        return;
      }

      // Increment the usedCount field in the PromoCode model
      await PromoCode.updateOne(
        { _id: promoCodeData._id },
        { $inc: { usedCount: 1 } }
      );
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error validating promo code: ${error}`,
      });
      return;
    }
  }

  // Create the reservation
  try {
    const reservation = new Reservation(reservationData);
    await reservation.save();
    // Send confirmation email
    await sendConfirmationEmail(reservation.email, reservation);

    res.status(201).json({
      success: true,
      message: "Reservation created successfully",
      reservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error creating reservation: ${error}`,
    });
  }
});

// @desc    Update reservation
// @route   PUT /api/reservation/:id
// @access  Private
const updateReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) {
    res.status(404).json({
      message: "Reservation not found",
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

// @desc    Delete Reservation
// @route   DELETE /api/reservation/:id
// @access  Private
const deleteReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) {
    res.status(404).json({
      message: "Reservation not found!",
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
    message: "Reservation were deleted.",
  });
});

module.exports = {
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
};
