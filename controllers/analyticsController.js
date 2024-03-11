// Basic Lib Imports
const asyncHandler = require('express-async-handler');
const Reservation = require('../models/ReservationModel');
const Menu = require('../models/MenuModel');
const Chef = require('../models/ChefModel');

/**
 * @desc    Get analytics of restaurant
 * @route   /api/v1/dashboard/
 * @method  GET
 * @access  Private
 * @returns List of all analytics report
 */
const dashboard = asyncHandler(async (req, res) => {
  const total_reservation = await Reservation.countDocuments();
  const total_menu = await Menu.countDocuments();
  const total_chef = await Chef.countDocuments();

  const data = {
    total_reservation: total_reservation,
    total_menu: total_menu,
    total_chef: total_chef,
  };

  res.status(200).json({
    status: 200,
    success: true,
    data: data,
    message: 'Analytics fetched successfully',
  });
});

module.exports = {
  dashboard,
};
