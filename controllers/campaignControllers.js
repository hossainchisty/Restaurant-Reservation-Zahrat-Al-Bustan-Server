// Basic Lib Imports
const asyncHandler = require("express-async-handler");
const Campaign = require("../models/CampaignModel");

// @desc    Get campaign
// @route   GET /api/campaign
// @access  Public
const getCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.find({});
  res.status(200).json(campaign);
});

// @desc    Set campaign
// @route   POST /api/campaign
// @access  Private
const setCampaign = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400).json({
      message: "Please add title.",
    });
  }
  if (!req.body.description) {
    res.status(400).json({
      message: "Please add description.",
    });
  }
  if (!req.body.start_date) {
    res.status(400).json({
      message: "Please add campaign start.",
    });
  }
  if (!req.body.end_date) {
    res.status(400).json({
      message: "Please add campaign end.",
    });
  }

  const campaign = await Campaign.create({
    title: req.body.title,
    description: req.body.description,
    images: req.body.images,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  });

  res.status(200).json(campaign);
});

// @desc    Update campaign
// @route   PUT /api/campaign/:id
// @access  Private
const updateCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);
  if (!campaign) {
    res.status(404).json({
      message: "Campaign not found",
    });
  }

  const updatedCampaign = await Campaign.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedCampaign);
});

// @desc    Delete campaign
// @route   DELETE /api/campaign/:id
// @access  Private
const deleteCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);
  if (!campaign) {
    res.status(404).json({
      message: "Campaign not found! it maybe deleted.",
    });
  }

  const deletedCampaign = await Campaign.findByIdAndRemove(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({
    data: deletedCampaign,
    id: req.params.id,
    message: "Campaign were deleted.",
  });
});

module.exports = {
  getCampaign,
  setCampaign,
  updateCampaign,
  deleteCampaign,
};
