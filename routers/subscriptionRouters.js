// Basic Lib Imports
const express = require("express");
const router = express.Router();

const {
    getSubscription,
    setSubscription,
    updateSubscription,
    deleteSubscription,
} = require("../controllers/subscriptionControllers");


// Routing Implement

router.get("/", getSubscription);

router.post("/", setSubscription);

router.put("/:id", updateSubscription);

router.delete("/:id", deleteSubscription);

module.exports = router;