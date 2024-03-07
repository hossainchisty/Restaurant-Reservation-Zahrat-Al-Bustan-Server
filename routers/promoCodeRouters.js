// Basic Lib Imports
const express = require("express");
const router = express.Router();

const {
    addPromoCode
} = require("../controllers/promoCodeControllers");

// Routing Implement

router.post("/add", addPromoCode);

module.exports = router;
