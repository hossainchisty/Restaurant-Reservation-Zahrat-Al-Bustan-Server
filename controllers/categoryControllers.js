// Basic Lib Imports
const asyncHandler = require("express-async-handler");
const Category = require("../models/CategoryModel");

/**
 * @desc    Get category
 * @route   /api/v1/category/
 * @method  GET
 * @access  Public
 * @returns list of all categories in database
 */
const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.find({});
  res.status(200).json(category);
});

/**
 * @desc    Set category
 * @route   /api/v1/category/
 * @method  POST
 * @access  Private
 * @returns New category
 */
const setCategory = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(404).json({
      message: "Please add name to countinue.",
    });
  }

  const category = await Category.create({
    name: req.body.name,
  });

  res.status(200).json(category);
});

/**
 * @desc    Update category
 * @route   /api/v1/category/:id
 * @method  PUT
 * @access  Private
 * @returns Updated category
 */
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404).json({
      message: "Category not found",
    });
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedCategory);
});

/**
 * @desc    Delete category
 * @route   /api/v1/category/:id
 * @method  DELETE
 * @access  Private
 * @returns Deleted category
 */
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404).json({
      message: "Category not found!",
    });
  }

  const deletedCategory = await Category.findByIdAndRemove(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({
    data: deletedCategory,
    id: req.params.id,
    message: "Category were deleted.",
  });
});

module.exports = {
  getCategory,
  setCategory,
  updateCategory,
  deleteCategory,
};
