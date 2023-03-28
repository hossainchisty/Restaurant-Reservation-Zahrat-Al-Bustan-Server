// Basic Lib Imports
const express = require("express");
const router = express.Router();

const {
    getCampaign,
    setCampaign,
    updateCampaign,
    deleteCampaign,
} = require("../../controllers/campaignControllers");


// Routing Implement

router.get("/", getCampaign);

router.post("/", setCampaign);

router.put("/:id", updateCampaign);

router.delete("/:id", deleteCampaign);

module.exports = router;
