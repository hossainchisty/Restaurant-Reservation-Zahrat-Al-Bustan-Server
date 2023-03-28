// Basic Lib Imports
const express = require("express");
const router = express.Router();

const {
    getReservation,
    createReservation,
    updateReservation,
    deleteReservation,
} = require("../controllers/reservationControllers");


// Routing Implement

router.get("/", getReservation);

router.post("/", createReservation);

router.put("/:id", updateReservation);

router.delete("/:id", deleteReservation);

module.exports = router;