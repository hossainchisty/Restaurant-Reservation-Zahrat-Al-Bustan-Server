// Basic Lib Imports
const asyncHandler = require("express-async-handler");
const Chef = require("../models/ChefModel");

// @desc    Get chef
// @route   GET /api/chefs
// @access  Public
const getChef = asyncHandler(async (req, res) => {
  const chefs = await Chef.find({});
  res.status(200).json(chefs);
});

// @desc    Set chef
// @route   POST /api/chefs
// @access  Private
const setChef = asyncHandler(async (req, res) => {
  const { name, images, short_description } = req.body;

  if (!name || !short_description) {
    return res.status(400).json({
      message: "Please add name and short description to continue.",
    });
  }

  const chef = await Chef.create({ name, images, short_description });
  res.status(201).json(chef);
});

// @desc    Update chef
// @route   PUT /api/chefs/:id
// @access  Private
const updateChef = asyncHandler(async (req, res) => {
  const chef = await Chef.findById(req.params.id);

  if (!chef) {
    return res.status(404).json({ message: "Chef not found" });
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
    return res.status(404).json({ message: "Chef not found!" });
  }

  await Chef.findByIdAndRemove(req.params.id);
  res.status(200).json({ id: req.params.id, message: "Chef was deleted." });
});

module.exports = {
  getChef,
  setChef,
  updateChef,
  deleteChef,
};