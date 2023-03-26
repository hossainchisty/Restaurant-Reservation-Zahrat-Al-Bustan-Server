// Basic Lib Imports
const asyncHandler = require("express-async-handler");
const Chef = require("../models/ChefModel");

// @desc    Get chef
// @route   GET /api/chefs
// @access  Public
const getChef = asyncHandler(async (req, res) => {
  const chefs = await Goal.find({}).select("-__v");
  res.status(200).json(chefs);
});

// @desc    Set chef
// @route   POST /api/chefs
// @access  Private
const setChef = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a text field.");
  }

  const chef = await Chef.create({
    name: req.body.name,
    images: req.body.images,
    short_description: req.body.short_description,
  });

  res.status(200).json(chef);
});

// @desc    Update chef
// @route   PUT /api/chefs/:id
// @access  Private
const updateChef = asyncHandler(async (req, res) => {
  const chef = await Chef.findById(req.params.id);
  if (!chef) {
    res.status(400);
    throw new Error("Chef not found");
  }

  const updatedChef = await Chef.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedChef);
});

// @desc    Delete chef
// @route   DELETE /api/chefs/:id
// @access  Private
const deleteChef = asyncHandler(async (req, res) => {
  const chef = await Chef.findById(req.params.id);
  if (!chef) {
    res.status(400);
    throw new Error("Chef not found");
  }

  const deletedChef = await Chef.findByIdAndRemove(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    data: deletedChef,
    id: req.params.id,
    message: "Chef were deleted.",
  });
});

module.exports = {
  getChef,
  setChef,
  updateChef,
  deleteChef,
};
