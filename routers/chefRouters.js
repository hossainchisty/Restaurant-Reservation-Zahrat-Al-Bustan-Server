// Basic Lib Imports
const express = require("express");
const router = express.Router();

const {
    getChef,
    setChef,
    updateChef,
    deleteChef,
} = require("../controllers/chefControllers");


// Routing Implement

router.get("/", getChef);

router.post("/", setChef);

router.put("/:id", updateChef);

router.delete("/:id", deleteChef);

module.exports = router;
