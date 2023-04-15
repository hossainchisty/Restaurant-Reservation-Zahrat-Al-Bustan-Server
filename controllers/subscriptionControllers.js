// Basic Lib Imports
const asyncHandler = require("express-async-handler");
const Subscription = require("../models/SubscriptionModel");

// @desc    Get Subscription
// @route   GET /api/Subscription
// @access  Public
const getSubscription = asyncHandler(async (req, res) => {
  const subscription = await Subscription.find({});
  res.status(200).json(subscription);
});

// @desc    Set Subscription
// @route   POST /api/subscription
// @access  Private
const setSubscription = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(404).json({
      message: "Please add name to countinue.",
    });
  }

  const subscription = await Subscription.create({
    name: req.body.name,
  });

  res.status(200).json(subscription);
});

// @desc    Update Subscription
// @route   PUT /api/subscription/:id
// @access  Private
const updateSubscription = asyncHandler(async (req, res) => {
  const subscription = await Subscription.findById(req.params.id);
  if (!subscription) {
    res.status(404).json({
      message: "Subscription not found",
    });
  }

  const updatedSubscription = await Subscription.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedSubscription);
});

// @desc    Delete Subscription
// @route   DELETE /api/subscription/:id
// @access  Private
const deleteSubscription = asyncHandler(async (req, res) => {
  const subscription = await Subscription.findById(req.params.id);
  if (!subscription) {
    res.status(404).json({
      message: "Subscription not found!",
    });
  }

  const deletedSubscription = await Subscription.findByIdAndRemove(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({
    data: deletedSubscription,
    id: req.params.id,
    message: "Subscription were deleted.",
  });
});

module.exports = {
  getSubscription,
  setSubscription,
  updateSubscription,
  deleteSubscription,
};
